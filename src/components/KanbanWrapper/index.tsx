import {useDispatch, useSelector} from 'react-redux'

import {
    ICol, IKanbanItems, TColName, TTasks,
} from '../../types'
import {Kanban} from '../Kanban'

import {updateColumns} from '@/redux'
import {RootState} from '@/redux/store'

export const KanbanWrapper = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.kanban.tasks)
    const columns = useSelector((state: RootState) => state.kanban.columns)

    const taskItems: TTasks = {}
    const columnItems: TColName = {}

    const getTaskItems = (elems: ICol[]) => {
        elems.forEach(elem => {
            taskItems[elem.id] = elem.tasks
        })

        return taskItems
    }

    const getColumnNames = (elems: ICol[]) => {
        elems.forEach(elem => {
            columnItems[elem.id] = elem.title
        })
        return columnItems
    }

    const handleSetTasks = (elems: IKanbanItems) => {
        const newCols = Object.entries(elems)
            .map(([colId, array]) => ({
                id: colId,
                title: getColumnNames(columns)[colId],
                tasks: array,
            }))
        dispatch(updateColumns(newCols))
    }

    return (
        <Kanban
            items={getTaskItems(columns)}
            columnNames={getColumnNames(columns)}
            tasks={tasks}
            onSetTasks={handleSetTasks}
            handle
        />
    )
}
