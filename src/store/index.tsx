import { combineReducers, configureStore } from '@reduxjs/toolkit'; 
import applicationSlice from './slices/application';

const reducer = combineReducers({
  applicationSlice
});
const store = configureStore({
  reducer
});
export default store;