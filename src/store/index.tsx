import { combineReducers, configureStore } from '@reduxjs/toolkit';
import applicationSlice from './slices/application';
import userSlice from './slices/user';

export const reducer = combineReducers({
  applicationSlice,
  userSlice
});

const store = configureStore({
  reducer
});
export default store;
