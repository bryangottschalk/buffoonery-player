import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ApplicationState {
  myConnectionId: string;
  navigationTab: string;
}

const initialState: ApplicationState = {
  myConnectionId: '',
  navigationTab: ''
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setMyConnectionId: (state, { payload }) => {
      state.myConnectionId = payload;
    },
    setNavigationTab: (state, { payload }) => {
      state.navigationTab = payload;
    }
  }
});

export const { setMyConnectionId, setNavigationTab } = applicationSlice.actions;

export const getApplicationState = (state: { application: any }) =>
  state.application;

export default applicationSlice.reducer;
