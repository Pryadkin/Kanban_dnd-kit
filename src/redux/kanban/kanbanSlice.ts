/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

import {ICol, ITask} from '../../types'

import {initialState} from './kanbanState'

export const kanbanSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addTasks: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload)
        },
        updateColumns: (state, action: PayloadAction<ICol[]>) => {
            state.columns = action.payload
        },
    },
})

export const {addTasks, updateColumns} = kanbanSlice.actions

export default kanbanSlice.reducer
