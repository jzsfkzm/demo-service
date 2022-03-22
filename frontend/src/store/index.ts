import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import jobs from './jobs';

const reducer = combineReducers({
  jobs
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>

export default store;
