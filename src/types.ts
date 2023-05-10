export interface ITask {
    id: string,
    title: string,
    assigned: string,
}

export interface ICol {
    id: string,
    title: string,
    tasks: string[],
}

export type TTasks = {
    [id: string]: string[]
}

export type TColName = {
    [id: string]: string
}
