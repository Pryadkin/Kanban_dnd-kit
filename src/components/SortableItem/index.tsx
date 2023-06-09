import {useEffect, useState} from 'react'

import {Item} from '@components/Item'
import {UniqueIdentifier} from '@dnd-kit/core'
import {useSortable} from '@dnd-kit/sortable'

import {TStatusColor} from '@/types'
import {getColor} from '@/utils'

interface SortableItemProps {
    value: any,
    containerId: UniqueIdentifier;
    id: UniqueIdentifier;
    index: number;
    handle: boolean;
    disabled?: boolean;
    statusColor: TStatusColor
    style(args: any): React.CSSProperties;
    getIndex(id: UniqueIdentifier): number;
    renderItem(): React.ReactElement;
    wrapperStyle({index}: {index: number}): React.CSSProperties;
}

export const SortableItem = ({
    disabled,
    value,
    id,
    index,
    handle,
    renderItem,
    style,
    containerId,
    getIndex,
    wrapperStyle,
    statusColor,
}: SortableItemProps) => {
    const {
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        isDragging,
        isSorting,
        over,
        overIndex,
        transform,
        transition,
    } = useSortable({
        id,
    })
    function useMountStatus() {
        const [isMounted, setIsMounted] = useState(false)

        useEffect(() => {
            const timeout = setTimeout(() => setIsMounted(true), 500)

            return () => clearTimeout(timeout)
        }, [])

        return isMounted
    }

    const mounted = useMountStatus()
    const mountedWhileDragging = isDragging && !mounted

    return (
        <Item
            ref={disabled ? undefined : setNodeRef}
            value={value[id]}
            dragging={isDragging}
            sorting={isSorting}
            handle={handle}
            handleProps={handle ? {ref: setActivatorNodeRef} : undefined}
            index={index}
            wrapperStyle={wrapperStyle({index})}
            style={style({
                index,
                value: id,
                isDragging,
                isSorting,
                overIndex: over ? getIndex(over.id) : overIndex,
                containerId,
            })}
            color={getColor(id)}
            statusColor={statusColor}
            transition={transition}
            transform={transform}
            fadeIn={mountedWhileDragging}
            listeners={listeners}
            renderItem={renderItem}
        />
    )
}
