import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'http://localhost:3001/api/boards/'

export const fetchBoardByIdAction = createAsyncThunk("board/fetch", async(id, rejectWithValue) => {
  try {
    const { data } = await axios.get(API_URL + id, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  board: {}
};

const boardByIdSlice = createSlice({
  name: "BoardById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBoardByIdAction.fulfilled, (state, action) => {
      state.board = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchBoardByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.boards = null; 
    });
    // builder.addCase(addBoardAction.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(addBoardAction.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.error = undefined;
    // });
    // builder.addCase(addBoardAction.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action?.payload;
    // });
  }
});

export default boardByIdSlice.reducer