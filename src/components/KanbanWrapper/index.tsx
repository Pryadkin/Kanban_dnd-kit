/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {KanbanElement} from '@/components/KanbanElement'
import {updateColumns} from '@/redux'
import {RootState} from '@/redux/store'
import {
    ICol, IKanbanItems, TColName, TTasks,
} from '@/types'

export const KanbanWrapper = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const columns = useSelector((state: RootState) => state.kanban.columns)
    const [taskItems, setTaskItems] = useState<TTasks>()
    const [colNames, setColNames] = useState<TColName>()

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

        setColNames(items)
    }

    const handleSetTasks = (elems: IKanbanItems) => {
        if (colNames) {
            const newCols = Object.entries(elems)
                .map(([colId, array]) => ({
                    id: colId,
                    title: colNames[colId],
                    tasks: array,
                }))
            dispatch(updateColumns(newCols))
        }
    }

    useEffect(() => {
        getColumnNames(columns)
        getTaskItems(columns)
    }, [])

    useEffect(() => {
        getColumnNames(columns)
        getTaskItems(columns)
    }, [tasks, columns])

    return (
        <div>
            {taskItems && colNames && (
                <KanbanElement
                    items={taskItems}
                    columnNames={colNames}
                    tasks={tasks}
                    onSetTasks={handleSetTasks}
                    handle
                />
            )}
        </div>
    )
}
