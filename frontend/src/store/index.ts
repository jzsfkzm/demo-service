import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { Action, combineReducers } from 'redux'

import jobs from './jobs';

const reducer = combineReducers({
  jobs
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export default store;
