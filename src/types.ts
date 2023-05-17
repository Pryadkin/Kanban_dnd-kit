import {UniqueIdentifier} from '@dnd-kit/core'

export type IKanbanItems = Record<UniqueIdentifier, UniqueIdentifier[]>

export type TStatusColor = 'high' | 'medium' | 'low'
export interface ITask {
    id: string,
    title: string,
    description: string,
    assigned: string,
    priority: TStatusColor,
}

export interface ICol {
    id: string,
    title: string,
    tasks: UniqueIdentifier[],
}

export type TTasks = {
    [id: UniqueIdentifier]: UniqueIdentifier[]
}

export type TColName = {
    [id: string]: string
}

export interface IObjTask {
    [id: string]: {
        id: string,
        title: string,
        description: string,
        assigned: string,
        priority: TStatusColor,
    }
}
