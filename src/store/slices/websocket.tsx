import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const SET_COMMENTS = 'SET_COMMENTS';

export const setComments = (comments: any) => ({
  type: SET_COMMENTS,
  comments
});
export const fetchCommentsThunk = createAsyncThunk(
  'application/sendWebsocketMessage',
  async (roomcode: string, thunkAPI: any) => {
    try {
      const { data } = await axios.get(
        `https://dev-api.buffoonery.io/getmeetingstate/${roomcode}`
      );
      thunkAPI.dispatch(setComments(data.comments));
    } catch (err) {
      console.log('ERROR fetching comments:', err);
    }
  }
);

const initialState = {
  comments: []
};

export default function websocketHandler(state = initialState, action: any) {
  switch (action.type) {
    case 'REDUX_WEBSOCKET::MESSAGE': // for use with actions dispatched from redux-websocket package
      let msg = JSON.parse(action.payload.message);
      if (typeof msg === 'string') {
        msg = JSON.parse(msg);
      }
      if (msg.comment) {
        return { ...state, comments: [...state.comments, msg.comment] };
      } else {
        return state;
      }

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: [...state.comments, ...action.comments]
      };
    default:
      return state;
  }
}
