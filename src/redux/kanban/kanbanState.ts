import {ICol, ITask} from '../../types'

export interface KanbanState {
    columns: ICol[]
    tasks: ITask[],
}

export const initialState: KanbanState = {
    columns: [
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
        {
            id: 'qweqwg45',
            title: 'doing',
            tasks: ['1', '2', '3'],
        },
    ],
    tasks: [
        {
            id: '1',
            title: 'task_08',
            assigned: 'anton',
        },
        {
            id: '2',
            title: 'task_09',
            assigned: 'anton',
        },
        {
            id: '3',
            title: 'task_10',
            assigned: 'anton',
        },
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
    ],
}
