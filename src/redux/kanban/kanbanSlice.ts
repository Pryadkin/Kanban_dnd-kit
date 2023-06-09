/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {ICol, ITask} from '../../types'

import {initialState} from './kanbanState'

export const kanbanSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateColumns: (state, action: PayloadAction<ICol[]>) => {
            state.columns = action.payload
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload)
        },
        updateTasks: (state, action: PayloadAction<ITask[]>) => {
            state.tasks = action.payload
        },
    },
})

export const {addTask, updateTasks, updateColumns} = kanbanSlice.actions

export default kanbanSlice.reducer
