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
            tasks: ['1', '23423', 'sdfwer23', '232434', '666'],
        },
        {
            id: 'sfeori2392',
            title: 'in progress',
            tasks: ['3345', 'sdfw45645er23', '23245645434'],
        },
        {
            id: 'qweqwg45',
            title: 'doing',
            tasks: ['2', '3'],
        },
    ],
    tasks: [
        {
            id: '1',
            title: 'Добавить кастомизацию компонентов с помощью элемента Pluses',
            description: `Сделать компонент Pluses (или доработать существующий компонент), который будет возвращать графические элементы "Плюсы".

            Компонент должен возвращать различные кол-во, расположение и габариты "плюсов", исходя из входных данных.

            Компонент должен быть размещен в контейнере с классом "icons-wrapper" (данный контейнер уже существует)

            Настройки отображения компонента должны храниться в файле "plusesIconsSettings" в папке src/assets/resources

            В файле настроек должно быть 2 конфигурации - для корп. лендинга и для Экспертизы

            Настройки берутся исходя из макетов в Figma`,
            assigned: 'anton',
            priority: 'low',
        },
        {
            id: '2',
            title: 'task_09',
            description: 'description',
            assigned: 'anton',
            priority: 'high',
        },
        {
            id: '3',
            title: 'task_10',
            description: 'description',
            assigned: 'anton',
            priority: 'low',
        },
        {
            id: '23423',
            title: 'сделать kanban',
            description: 'description',
            assigned: 'anton',
            priority: 'medium',
        },
        {
            id: 'sdfwer23',
            title: 'title_2',
            description: 'description',
            assigned: 'anton',
            priority: 'low',
        },
        {
            id: '232434',
            title: 'title66',
            description: 'description',
            assigned: 'anton',
            priority: 'low',
        },
        {
            id: '666',
            title: 'title_334',
            description: 'description',
            assigned: 'anton',
            priority: 'low',
        },
        {
            id: '3345',
            title: 'title_32f3f',
            description: 'description',
            assigned: 'anton',
            priority: 'high',
        },
        {
            id: 'sdfw45645er23',
            title: 'sdf',
            description: 'description',
            assigned: 'anton',
            priority: 'medium',
        },
        {
            id: '23245645434',
            title: 'titlsfsdfse_3',
            description: 'description',
            assigned: 'anton',
            priority: 'medium',
        },
    ],
}
