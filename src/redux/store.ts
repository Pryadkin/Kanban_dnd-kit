import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit'

import kanbanReducer from './kanban/kanbanSlice'

export const store = configureStore({
    reducer: {
        kanban: kanbanReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
