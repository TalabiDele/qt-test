import { configureStore } from '@reduxjs/toolkit'
import { tokenSlice } from './token/TokenSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
	reducer: {
		token: tokenSlice.reducer,
	},
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector

export default store
