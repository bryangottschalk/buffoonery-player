import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import reduxWebsocket from '@giantmachines/redux-websocket';

import applicationSlice from './slices/application';
import userSlice from './slices/user';
// import socketMiddleware from './';
import logger from 'redux-logger';

export const reducer = combineReducers({
  applicationSlice,
  userSlice
});

const reduxWebsocketMiddleware = reduxWebsocket({
  dateSerializer: (date) => {
    console.log('🚀 ~ file: index.js ~ line 20 ~ date', date);
    return date.toString();
  }
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'REDUX_WEBSOCKET::CONNECT',
          'REDUX_WEBSOCKET::OPEN',
          'REDUX_WEBSOCKET::MESSAGE',
          'REDUX_WEBSOCKET::SEND'
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates']
      }
    }).concat(reduxWebsocketMiddleware)
});
export default store;
