import {UniqueIdentifier} from '@dnd-kit/core'

export type IKanbanItems = Record<UniqueIdentifier, UniqueIdentifier[]>

export interface ITask {
    id: string,
    title: string,
    assigned: string,
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
