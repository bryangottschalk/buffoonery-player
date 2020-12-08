import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    }
  }
});

export const {
  setMyConnectionUrl,
  setNavigationTab,
  connectToRoom,
  connectToRoomSuccess,
  connectToRoomFailure
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
      const ws = new WebSocket(connectionUrl);
      ws.onerror = (err) => {
        thunkAPI.dispatch(connectToRoomFailure('error connecting to room'));
      };
      if (ws) {
        ws.onopen = async () => {
          const connectMsg = {
            action: 'sendmessage',
            data: {
              msg: `MOBILE CONNECTION OPENED IN ROOM: ${connectionUrl}`,
              roomcode,
              name
            }
          };
          ws.send(JSON.stringify(connectMsg));
          thunkAPI.dispatch(connectToRoomSuccess());
        };
      } else {
        console.log('error 3');
        thunkAPI.dispatch(connectToRoomFailure('error connecting to room'));
        return;
      }
    } catch (err) {
      thunkAPI.dispatch(connectToRoomFailure(err));
      return;
    }
  }
);

export default applicationSlice.reducer;
