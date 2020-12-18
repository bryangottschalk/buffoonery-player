import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface ContributeState {
  loading: boolean;
  hasErrors: boolean;
  errorMsg: string;
  categories: any[];
}

const initialState: ContributeState = {
  loading: false,
  hasErrors: false,
  errorMsg: '',
  categories: []
};

const contributeSlice = createSlice({
  name: 'contribute',
  initialState,
  reducers: {
    getPromptCategories: (state) => {
      state.loading = true;
    },
    getPromptCategoriesFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMsg = payload;
    },
    getPromptCategoriesSuccess: (state, { payload }) => {
      state.categories = payload;
      state.loading = false;
      state.hasErrors = false;
    }
  }
});
export const {
  getPromptCategories,
  getPromptCategoriesSuccess,
  getPromptCategoriesFailure
} = contributeSlice.actions;

export const fetchCategories = createAsyncThunk(
  'contribute/fetchCategories',
  async (_input, thunkAPI: any) => {
    thunkAPI.dispatch(getPromptCategories());
    try {
      const { data } = await axios.get(
        `https://dev-api.buffoonery.io/GetPromptCategories`
      );
      thunkAPI.dispatch(getPromptCategoriesSuccess(data.Items));
    } catch (err) {
      thunkAPI.dispatch(getPromptCategoriesFailure(err.message));
    }
  }
);

export default contributeSlice.reducer;
