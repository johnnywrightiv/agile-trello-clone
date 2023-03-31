import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//action
export const fetchBoardsAction = createAsyncThunk("boards/fetch", async(userId, rejectWithValue) => {
  try {
    const { data } = await axios.get({USERBOARD_GET_METHOD_ADDRESS});

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  boards: [],
};

const boardsSlice = createSlice({
  name: "userBoards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBoardsAction.fulfilled, (state, action) => {
      state.boards = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchBoardsAction.rejected, (state, action) => {
      state.loading = false;
      state.boards = undefined;
      state.error = action?.payload;
    });
  }
});

export default boardsSlice.reducer