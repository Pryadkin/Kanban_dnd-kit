/* eslint-disable for-direction */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {KanbanElement} from '@/components/KanbanElement'
import {updateColumns} from '@/redux'
import {RootState} from '@/redux/store'
import {
    ICol, IKanbanItems, IObjTask, ITask, TColName, TTasks,
} from '@/types'

export const KanbanWrapper = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const columns = useSelector((state: RootState) => state.kanban.columns)
    const [taskItems, setTaskItems] = useState<TTasks>()
    const [objColNames, setObjColNames] = useState<TColName>()
    const [objTask, setObjTask] = useState<IObjTask>()

    const getTaskItems = (elems: ICol[]) => {
        const items: TTasks = {}

        elems.forEach(elem => {
            items[elem.id] = elem.tasks
        })

        setTaskItems(items)
    }

    const getColumnNames = (elems: ICol[]) => {
        const items: TColName = {}

        elems.forEach(elem => {
            items[elem.id] = elem.title
        })

        setObjColNames(items)
    }

    const handleSetTasks = (elems: IKanbanItems) => {
        if (objColNames) {
            const newCols = Object.entries(elems)
                .map(([colId, taskArray]) => ({
                    id: colId,
                    title: objColNames[colId],
                    tasks: taskArray,
                }))
            dispatch(updateColumns(newCols))
        }
    }

    const handleSetColumns = (colIds: string[]) => {
        const newCols = colIds.map(colId => {
            let newCol: any = null
            columns.forEach(column => {
                if (column.id === colId) {
                    newCol = column
                }
            })
            return newCol
        })

        dispatch(updateColumns(newCols))
    }

    const taskToObjTask = (taskElems: ITask[]) => {
        const task: IObjTask = {}

        taskElems.forEach(taskElem => {
            task[taskElem.id] = {
                id: taskElem.id,
                title: taskElem.title,
                description: taskElem.description,
                assigned: taskElem.assigned,
                priority: taskElem.priority,
            }
        })

        setObjTask(task)
    }

    useEffect(() => {
        getColumnNames(columns)
        getTaskItems(columns)
    }, [tasks, columns])

    useEffect(() => {
        taskToObjTask(tasks)
    }, [tasks])

    return (
        <div>
            {taskItems && objColNames && objTask && (
                <KanbanElement
                    items={taskItems}
                    objColNames={objColNames}
                    objTask={objTask}
                    onSetTasks={handleSetTasks}
                    onSetColumn={handleSetColumns}
                    handle
                />
            )}
        </div>
    )
}
