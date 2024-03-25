import { configureStore } from '@reduxjs/toolkit';
import { tokenSlice } from './token/TokenSlice'; // Import the user slice
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// Create the Redux store
const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  },  
});

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;

export default store;