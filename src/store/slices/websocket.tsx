import axios, { AxiosRequestConfig } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getConfig } from './contribute';
import {
  fetchConnectToRoom,
  setMyConnectionUrl
} from '../../store/slices/application';

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
  type: SET_COMMENTS_FAILURE,
  errorMsg
});

export const fetchInitialStateAndConnect = createAsyncThunk(
  'application/fetchInitialStateAndConnect',
  async (
    input: { roomcode: string; connectionUrl: string; name: string },
    thunkAPI: any
  ) => {
    const { roomcode, connectionUrl, name } = input;
    const config: AxiosRequestConfig = getConfig();
    thunkAPI.dispatch(setComments());
    try {
      const { data } = await axios.get(
        `https://dev-api.buffoonery.io/GetGameroomState/${roomcode}`,
        config
      );
      // checks for existing meeting before connecting to websocket
      thunkAPI.dispatch(setCommentsSuccess(data.comments));
      thunkAPI.dispatch(setMyConnectionUrl(connectionUrl));
      thunkAPI.dispatch(fetchConnectToRoom({ connectionUrl, roomcode, name }));
    } catch (err) {
      console.log(
        'ERROR fetching initial state or websocket connection:',
        err.message
      );
      thunkAPI.dispatch(setCommentsFailure(err.message));
    }
  }
);

interface WebsocketState {
  comments: any[];
  loading: boolean;
  hasErrors: boolean;
  errorMsg: string;
  hasReceivedPrompts: boolean;
  hasSubmittedAllPrompts: boolean;
  prompt: any;
}
const initialState: WebsocketState = {
  comments: [],
  loading: false,
  hasErrors: false,
  errorMsg: '',
  hasReceivedPrompts: false,
  hasSubmittedAllPrompts: false,
  prompt: null
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
      } else if (msg.topic === 'PromptSubmission') {
        return { ...state, hasSubmittedAllPrompts: true };
      } else if (msg.topic === 'DistributePromptsToPlayers') {
        return {
          ...state,
          hasReceivedPrompts: true,
          prompt: msg.prompt.prompt
        };
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
