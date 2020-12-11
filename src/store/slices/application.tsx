import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { connect, send } from '@giantmachines/redux-websocket';
import store from '../../store';
interface ApplicationState {
  websocket: any;
  myConnectionUrl: string;
  navigationTab: string;
  isConnected: boolean;
  loading: boolean;
  hasErrors: boolean;
  errorMsg: string;
}

const initialState: ApplicationState = {
  websocket: null,
  myConnectionUrl: '',
  navigationTab: '',
  isConnected: false,
  loading: false,
  hasErrors: false,
  errorMsg: ''
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setMyConnectionUrl: (state, { payload }) => {
      state.myConnectionUrl = payload;
    },
    setNavigationTab: (state, { payload }) => {
      state.navigationTab = payload;
    },
    connectToRoom: (state) => {
      state.loading = true;
    },
    connectToRoomFailure: (state, { payload }) => {
      console.log('🚀 ~ file: application.tsx ~ line 38 ~ payload', payload);
      state.loading = false;
      state.isConnected = false;
      state.hasErrors = true;
      state.errorMsg = payload;
    },
    connectToRoomSuccess: (state) => {
      state.isConnected = true;
      state.loading = false;
      state.hasErrors = false;
    },
    sendWebsocketMessage: (state) => {
      state.loading = true;
    },
    sendWebsocketMessageFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMsg = payload;
    },
    sendWebsocketMessageSuccess: (state) => {
      state.loading = false;
      state.hasErrors = false;
    }
  }
});

export const {
  setMyConnectionUrl,
  setNavigationTab,
  connectToRoom,
  connectToRoomSuccess,
  connectToRoomFailure,
  sendWebsocketMessage,
  sendWebsocketMessageSuccess,
  sendWebsocketMessageFailure
} = applicationSlice.actions;

export const getApplicationState = (state: { application: any }) =>
  state.application;

export const fetchConnectToRoom = createAsyncThunk(
  'application/fetchConnectToRoom',
  async (
    input: { connectionUrl: string; roomcode: string; name: string },
    thunkAPI: any
  ) => {
    const { connectionUrl, roomcode, name } = input;
    try {
      thunkAPI.dispatch(connectToRoom());
      await thunkAPI.dispatch(connect(connectionUrl));
      thunkAPI.dispatch(connectToRoomSuccess());
    } catch (err) {
      thunkAPI.dispatch(connectToRoomFailure(err.message));
    }
  }
);

export const fetchSendWebsocketMessage = createAsyncThunk(
  'application/sendWebsocketMessage',
  async (
    input: { comment: string; user: string; roomcode: string },
    thunkAPI: any
  ) => {
    const { comment, roomcode } = input;
    thunkAPI.dispatch(sendWebsocketMessage());

    const connectMsg = {
      action: 'sendmessage',
      data: {
        roomcode: roomcode,
        comment
      }
    };
    await thunkAPI.dispatch(send(connectMsg));
    thunkAPI.dispatch(sendWebsocketMessageSuccess());

    try {
    } catch (err) {
      thunkAPI.dispatch(sendWebsocketMessageFailure(err.message));
    }
  }
);

export default applicationSlice.reducer;
