import {useState} from 'react'

import {Kanban} from './components/Kanban'
import {
    ICol, ITask, TColName, TTasks,
} from './types'

const tasks: ITask[] = [
    {
        id: 'lblr',
        title: 'title_1',
    },
    {
        id: 'lblsdfr',
        title: 'title_2',
    },
    {
        id: 'lblsdgfhrr',
        title: 'title_3',
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

const App = () => {
    const taskItems: TTasks = {}
    const columnItems: TColName = {}

    const getTaskItems = (cols: ICol[]) => {
        cols.forEach(col => {
            taskItems[col.id] = col.tasks
        })

        return taskItems
    }

    const getColumnNames = (cols: ICol[]) => {
        cols.forEach(col => {
            columnItems[col.id] = col.title
        })
        return columnItems
    }

    return (
        <div>
            <Kanban
                items={getTaskItems(columns)}
                columnNames={getColumnNames(columns)}
            />
        </div>
    )
}

export default App
