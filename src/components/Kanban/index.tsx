/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {
    useCallback, useEffect, useRef, useState,
} from 'react'
import {createPortal, unstable_batchedUpdates} from 'react-dom'

import {
    CancelDrop,
    closestCenter,
    pointerWithin,
    rectIntersection,
    CollisionDetection,
    DndContext,
    DragOverlay,
    DropAnimation,
    getFirstCollision,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    Modifiers,
    useDroppable,
    UniqueIdentifier,
    useSensors,
    useSensor,
    MeasuringStrategy,
    KeyboardCoordinateGetter,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
    SortingStrategy,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

import {Container} from '../Container'
import {DroppableContainer} from '../DroppableContainer'
import {Item} from '../Item'
import {SortableItem} from '../SortableItem'

import {IKanbanItems, ITask, TColName} from '@/types'
import {createRange, getColor, coordinateGetter as multipleContainersCoordinateGetter} from '@/utils'

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.5',
            },
        },
    }),
}

interface Props {
    tasks: ITask[];
    columnNames: TColName;
    adjustScale?: boolean;
    cancelDrop?: CancelDrop;
    columns?: number;
    containerStyle?: React.CSSProperties;
    coordinateGetter?: KeyboardCoordinateGetter;
    getItemStyles?(args: {
        value: UniqueIdentifier;
        index: number;
        overIndex: number;
        isDragging: boolean;
        containerId: UniqueIdentifier;
        isSorting: boolean;
        isDragOverlay: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: {index: number}): React.CSSProperties;
    itemCount?: number;
    items?: IKanbanItems;
    handle?: boolean;
    renderItem?: any;
    strategy?: SortingStrategy;
    modifiers?: Modifiers;
    minimal?: boolean;
    trashable?: boolean;
    scrollable?: boolean;
    vertical?: boolean;
    onSetTasks: (val: IKanbanItems) => void
}

export const TRASH_ID = 'void'
const PLACEHOLDER_ID = 'placeholder'

const Trash = ({id}: {id: UniqueIdentifier}) => {
    const {setNodeRef, isOver} = useDroppable({
        id,
    })

    return (
        <div
            ref={setNodeRef}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                left: '50%',
                marginLeft: -150,
                bottom: 20,
                width: 300,
                height: 60,
                borderRadius: 5,
                border: '1px solid',
                borderColor: isOver ? 'red' : '#DDD',
            }}
        >
            Drop here to delete
        </div>
    )
}

interface IObjTask {
    [id: string]: {
        id: string,
        title: string,
        description: string,
        assigned: string,
    }
}

export const Kanban = ({
    tasks,
    columnNames,
    adjustScale = false,
    itemCount = 3,
    cancelDrop,
    columns,
    handle = false,
    items: initialItems,
    containerStyle,
    coordinateGetter = multipleContainersCoordinateGetter,
    getItemStyles = () => ({}),
    wrapperStyle = () => ({}),
    minimal = false,
    modifiers,
    renderItem,
    strategy = verticalListSortingStrategy,
    trashable = false,
    vertical = false,
    scrollable,
    onSetTasks,
}: Props) => {
    const taskToObjTask = (taskElems: ITask[]) => {
        const objTask: IObjTask = {}

        taskElems.forEach(taskElem => {
            objTask[taskElem.id] = {
                id: taskElem.id,
                title: taskElem.title,
                description: taskElem.description,
                assigned: taskElem.assigned,
            }
        })

        return objTask
    }

    const [items, setItems] = useState<IKanbanItems>(
        () => initialItems ?? {
            A: createRange(itemCount, index => `A${index + 1}`),
            B: createRange(itemCount, index => `B${index + 1}`),
            C: createRange(itemCount, index => `C${index + 1}`),
            D: createRange(itemCount, index => `D${index + 1}`),
        },
    )

    useEffect(() => {
        initialItems && setItems(initialItems)
    }, [initialItems])

    const [containers, setContainers] = useState(
        Object.keys(items) as UniqueIdentifier[],
    )
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const lastOverId = useRef<UniqueIdentifier | null>(null)
    const recentlyMovedToNewContainer = useRef(false)
    const isSortingContainer = activeId ? containers.includes(activeId) : false

    /**
     * Custom collision detection strategy optimized for multiple containers
     *
     * - First, find any droppable containers intersecting with the pointer.
     * - If there are none, find intersecting containers with the active draggable.
     * - If there are no intersecting containers, return the last matched intersection
     *
     */
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        args => {
            if (activeId && activeId in items) {
                return closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter(
                        container => container.id in items,
                    ),
                })
            }

            // Start by finding any intersecting droppable
            const pointerIntersections = pointerWithin(args)
            const intersections = pointerIntersections.length > 0 // If there are droppables intersecting with the pointer, return those
                ? pointerIntersections
                : rectIntersection(args)
            let overId = getFirstCollision(intersections, 'id')

            if (overId != null) {
                if (overId === TRASH_ID) {
                    // If the intersecting droppable is the trash, return early
                    // Remove this if you're not using trashable functionality in your app
                    return intersections
                }

                if (overId in items) {
                    const containerItems = items[overId]

                    // If a container is matched and it contains items (columns 'A', 'B', 'C')
                    if (containerItems.length > 0) {
                        // Return the closest droppable within that container
                        overId = closestCenter({
                            ...args,
                            droppableContainers: args.droppableContainers.filter(
                                container => container.id !== overId
                                    && containerItems.includes(container.id),
                            ),
                        })[0]?.id
                    }
                }

                lastOverId.current = overId

                return [{id: overId}]
            }

            // When a draggable item moves to a new container, the layout may shift
            // and the `overId` may become `null`. We manually set the cached `lastOverId`
            // to the id of the draggable item that was moved to the new container, otherwise
            // the previous `overId` will be returned which can cause items to incorrectly shift positions
            if (recentlyMovedToNewContainer.current) {
                lastOverId.current = activeId
            }

            // If no droppable is matched, return the last match
            return lastOverId.current ? [{id: lastOverId.current}] : []
        },
        [activeId, items],
    )
    const [clonedItems, setClonedItems] = useState<IKanbanItems | null>(null)
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter,
        }),
    )
    const findContainer = (id: UniqueIdentifier) => {
        if (id in items) {
            return id
        }

        return Object.keys(items)
            .find(key => items[key].includes(id))
    }

    const getIndex = (id: UniqueIdentifier) => {
        const container = findContainer(id)

        if (!container) {
            return -1
        }

        const index = items[container].indexOf(id)

        return index
    }

    const onDragCancel = () => {
        if (clonedItems) {
            // Reset items to their original state in case items have been
            // Dragged across containers
            setItems(clonedItems)
        }

        setActiveId(null)
        setClonedItems(null)
    }

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false
        })
    }, [items])

    function renderSortableItemDragOverlay(id: UniqueIdentifier) {
        return (
            <Item
                value={taskToObjTask(tasks)[id]}
                handle={handle}
                style={getItemStyles({
                    containerId: findContainer(id) as UniqueIdentifier,
                    overIndex: -1,
                    index: getIndex(id),
                    value: id,
                    isSorting: true,
                    isDragging: true,
                    isDragOverlay: true,
                })}
                color={getColor(id)}
                wrapperStyle={wrapperStyle({index: 0})}
                renderItem={renderItem}
                dragOverlay
            />
        )
    }

    function renderContainerDragOverlay(containerId: UniqueIdentifier) {
        return (
            <Container
                label={columnNames[containerId]}
                columns={columns}
                style={{
                    height: '100%',
                }}
                shadow
                unstyled={false}
            >
                {items[containerId].map((item, index) => (
                    <Item
                        key={item}
                        value={taskToObjTask(tasks)[item]}
                        handle={handle}
                        style={getItemStyles({
                            containerId,
                            overIndex: -1,
                            index: getIndex(item),
                            value: item,
                            isDragging: false,
                            isSorting: false,
                            isDragOverlay: false,
                        })}
                        color={getColor(item)}
                        wrapperStyle={wrapperStyle({index})}
                        renderItem={renderItem}
                    />
                ))}
            </Container>
        )
    }

    function handleRemove(containerID: UniqueIdentifier) {
        setContainers(containers => containers.filter(id => id !== containerID))
    }

    function getNextContainerId() {
        const containerIds = Object.keys(items)
        const lastContainerId = containerIds[containerIds.length - 1]

        return String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId()

        unstable_batchedUpdates(() => {
            setContainers(containers => [...containers, newContainerId])
            setItems(items => ({
                ...items,
                [newContainerId]: [],
            }))
        })
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
            onDragStart={({active}) => {
                setActiveId(active.id)
                setClonedItems(items)
            }}
            onDragOver={({active, over}) => {
                const overId = over?.id

                if (overId == null || overId === TRASH_ID || active.id in items) {
                    return
                }

                const overContainer = findContainer(overId)
                const activeContainer = findContainer(active.id)

                if (!overContainer || !activeContainer) {
                    return
                }

                if (activeContainer !== overContainer) {
                    setItems(items => {
                        const activeItems = items[activeContainer]
                        const overItems = items[overContainer]
                        const overIndex = overItems.indexOf(overId)
                        const activeIndex = activeItems.indexOf(active.id)

                        let newIndex = 0

                        if (overId in items) {
                            newIndex = overItems.length + 1
                        } else {
                            const isBelowOverItem = over
                                && active.rect.current.translated
                                && active.rect.current.translated.top
                                > over.rect.top + over.rect.height

                            const modifier = isBelowOverItem ? 1 : 0

                            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
                        }

                        recentlyMovedToNewContainer.current = true

                        return {
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                item => item !== active.id,
                            ),
                            [overContainer]: [
                                ...items[overContainer].slice(0, newIndex),
                                items[activeContainer][activeIndex],
                                ...items[overContainer].slice(
                                    newIndex,
                                    items[overContainer].length,
                                ),
                            ],
                        }
                    })
                }
            }}
            onDragEnd={({active, over}) => {
                if (active.id in items && over?.id) {
                    setContainers(containers => {
                        const activeIndex = containers.indexOf(active.id)
                        const overIndex = containers.indexOf(over.id)

                        return arrayMove(containers, activeIndex, overIndex)
                    })
                }

                const activeContainer = findContainer(active.id)

                if (!activeContainer) {
                    setActiveId(null)
                    return
                }

                const overId = over?.id

                if (overId == null) {
                    setActiveId(null)
                    return
                }

                if (overId === TRASH_ID) {
                    setItems(items => ({
                        ...items,
                        [activeContainer]: items[activeContainer].filter(
                            id => id !== activeId,
                        ),
                    }))

                    setActiveId(null)
                    return
                }

                if (overId === PLACEHOLDER_ID) {
                    const newContainerId = getNextContainerId()

                    unstable_batchedUpdates(() => {
                        setContainers(containers => [...containers, newContainerId])
                        setItems(items => ({
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                id => id !== activeId,
                            ),
                            [newContainerId]: [active.id],
                        }))
                        setActiveId(null)

                        onSetTasks({
                            ...items,
                            [activeContainer]: items[activeContainer].filter(
                                id => id !== activeId,
                            ),
                            [newContainerId]: [active.id],
                        })
                    })
                    return
                }

                const overContainer = findContainer(overId)

                if (overContainer) {
                    const activeIndex = items[activeContainer].indexOf(active.id)
                    const overIndex = items[overContainer].indexOf(overId)

                    if (activeIndex !== overIndex) {
                        setItems(items => ({
                            ...items,
                            [overContainer]: arrayMove(
                                items[overContainer],
                                activeIndex,
                                overIndex,
                            ),
                        }))
                        onSetTasks({
                            ...items,
                            [overContainer]: arrayMove(
                                items[overContainer],
                                activeIndex,
                                overIndex,
                            ),
                        })
                    } else {
                        onSetTasks(items)
                    }
                }

                setActiveId(null)
            }}
            cancelDrop={cancelDrop}
            onDragCancel={onDragCancel}
            modifiers={modifiers}
        >
            <div
                style={{
                    display: 'inline-grid',
                    boxSizing: 'border-box',
                    padding: 20,
                    gridAutoFlow: vertical ? 'row' : 'column',
                }}
            >
                <SortableContext
                    items={[...containers, PLACEHOLDER_ID]}
                    strategy={
                        vertical
                            ? verticalListSortingStrategy
                            : horizontalListSortingStrategy
                    }
                >
                    {containers.map(containerId => (
                        <DroppableContainer
                            key={containerId}
                            id={containerId}
                            label={minimal ? undefined : columnNames[containerId]}
                            columns={columns}
                            items={items[containerId]}
                            scrollable={scrollable}
                            style={containerStyle}
                            unstyled={minimal}
                            onRemove={() => handleRemove(containerId)}
                        >
                            <SortableContext items={items[containerId]} strategy={strategy}>
                                {items[containerId].map((value, index) => (
                                    <SortableItem
                                        disabled={isSortingContainer}
                                        key={value}
                                        value={taskToObjTask(tasks)}
                                        id={taskToObjTask(tasks)[value].id}
                                        index={index}
                                        handle={handle}
                                        style={getItemStyles}
                                        wrapperStyle={wrapperStyle}
                                        renderItem={renderItem}
                                        containerId={containerId}
                                        getIndex={getIndex}
                                    />
                                ))}
                            </SortableContext>
                        </DroppableContainer>
                    ))}
                    {/* {minimal
                        ? undefined
                        : (
                            <DroppableContainer
                                id={PLACEHOLDER_ID}
                                disabled={isSortingContainer}
                                items={empty}
                                onClick={handleAddColumn}
                                placeholder
                            >
                                + Add column
                            </DroppableContainer>
                        )} */}
                </SortableContext>
            </div>
            {createPortal(
                <DragOverlay
                    adjustScale={adjustScale}
                    dropAnimation={dropAnimation}
                >
                    {activeId
                        ? containers.includes(activeId)
                            ? renderContainerDragOverlay(activeId)
                            : renderSortableItemDragOverlay(activeId)
                        : null}
                </DragOverlay>,
                document.body,
            )}
            {trashable && activeId && !containers.includes(activeId)
                ? (
                    <Trash id={TRASH_ID} />
                )
                : null}
        </DndContext>
    )
}
