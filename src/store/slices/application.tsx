import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApplicationState {
  myConnectionId: string;
}

const initialState: ApplicationState = {
    myConnectionId: ''
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setMyConnectionId: (state, { payload }) => {
      state.myConnectionId = payload;
    }
  }
});

export const { setMyConnectionId } = applicationSlice.actions;

export const getApplicationState = (state: { application: ApplicationState; }) => state.application;

export default applicationSlice.reducer;
