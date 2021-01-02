import axios, { AxiosRequestConfig } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConfig } from './contribute';

const SET_COMMENTS = 'SET_COMMENTS';
const SET_COMMENTS_SUCCESS = 'SET_COMMENTS_SUCCESS';
const SET_COMMENTS_FAILURE = 'SET_COMMENTS_FAILURE';

export const setComments = () => ({
  type: SET_COMMENTS
});
export const setCommentsSuccess = (comments: any) => ({
  type: SET_COMMENTS_SUCCESS,
  comments
});
export const setCommentsFailure = (errorMsg: string) => ({
  type: SET_COMMENTS_SUCCESS,
  errorMsg
});
export const fetchCommentsThunk = createAsyncThunk(
  'application/sendWebsocketMessage',
  async (roomcode: string, thunkAPI: any) => {
    const config: AxiosRequestConfig = getConfig();
    thunkAPI.dispatch(setComments());
    try {
      const { data } = await axios.get(
        `https://dev-api.buffoonery.io/GetGameroomState/${roomcode}`,
        config
      );
      thunkAPI.dispatch(setCommentsSuccess(data.comments));
    } catch (err) {
      console.log('ERROR fetching comments:', err);
      thunkAPI.dispatch(setCommentsFailure(err));
    }
  }
);

const initialState = {
  comments: [],
  loading: false,
  hasErrors: false,
  errorMsg: ''
};

export default function websocketHandler(state = initialState, action: any) {
  switch (action.type) {
    case 'REDUX_WEBSOCKET::MESSAGE': // for use with actions dispatched from redux-websocket package
      let msg = JSON.parse(action.payload.message);
      if (typeof msg === 'string') {
        msg = JSON.parse(msg);
      }
      if (msg.comment) {
        return { ...state, comments: [msg.comment, ...state.comments] };
      } else {
        return state;
      }
    case SET_COMMENTS:
      return {
        ...state,
        loading: true
      };
    case SET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        hasErrors: false,
        comments: [...state.comments, ...action.comments].reverse()
      };
    case SET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
        errorMsg: action.errorMsg
      };
    default:
      return state;
  }
}
