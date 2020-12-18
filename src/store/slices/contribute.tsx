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
    },
    savePrompt: (state) => {
      state.loading = true;
    },
    savePromptFailure: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = true;
      state.errorMsg = payload;
    },
    savePromptSuccess: (state, { payload }) => {
      state.categories
        .find((c) => c.category === payload.category)
        .prompts.unshift(payload.prompt);
      state.loading = false;
      state.hasErrors = false;
    }
  }
});
export const {
  getPromptCategories,
  getPromptCategoriesSuccess,
  getPromptCategoriesFailure,
  savePrompt,
  savePromptSuccess,
  savePromptFailure
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

export const fetchSavePrompt = createAsyncThunk(
  'contribute/savePrompt',
  async (input: { category: string; prompt: string }, thunkAPI: any) => {
    thunkAPI.dispatch(savePrompt());
    const promptPayload = {
      prompt: input.prompt,
      submittedBy: 'someone cool',
      timestamp: new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    };
    try {
      await axios.put(`https://dev-api.buffoonery.io/SavePrompt`, {
        category: input.category,
        prompt: promptPayload
      });
      thunkAPI.dispatch(
        savePromptSuccess({ category: input.category, prompt: promptPayload })
      );
    } catch (err) {
      thunkAPI.dispatch(savePromptFailure(err.message));
    }
  }
);

export default contributeSlice.reducer;
