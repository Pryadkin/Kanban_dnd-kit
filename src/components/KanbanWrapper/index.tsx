import {useState} from 'react'

import {
    ICol, ITask, TColName, TTasks,
} from '../../types'
import {Kanban} from '../Kanban'

const tasks: ITask[] = [
    {
        id: '23423',
        title: 'сделать kanban',
        assigned: 'anton',
    },
    {
        id: 'sdfwer23',
        title: 'title_2',
        assigned: 'anton',
    },
    {
        id: '232434',
        title: 'title66',
        assigned: 'anton',
    },
    {
        id: '666',
        title: 'title_334',
        assigned: 'anton',
    },
    {
        id: '3345',
        title: 'title_32f3f',
        assigned: 'anton',
    },
    {
        id: 'sdfw45645er23',
        title: 'sdf',
        assigned: 'anton',
    },
    {
        id: '23245645434',
        title: 'titlsfsdfse_3',
        assigned: 'anton',
    },
]

const columns: ICol[] = [
    {
        id: 'sfeosdfri2392',
        title: 'to do',
        tasks: ['23423', 'sdfwer23', '232434', '666'],
    },
    {
        id: 'sfeori2392',
        title: 'in progress',
        tasks: ['3345', 'sdfw45645er23', '23245645434'],
    },
]

export const KanbanWrapper = () => {
    const taskItems: TTasks = {}
    const columnItems: TColName = {}

    const [cols, setCols] = useState()

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

    const handleSetTasks = (elems: any) => {
        const newCols = Object.entries(elems)
            .map(([colId, array]) => ({
                id: colId,
                title: getColumnNames(columns)[colId],
                tasks: array,
            }))
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
