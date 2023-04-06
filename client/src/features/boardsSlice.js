import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'http://localhost:3001/api/boards'


//action
export const fetchBoardsAction = createAsyncThunk("boards/fetch", async(rejectWithValue) => {
  try {
    const { data } = await axios.get(API_URL + '/', authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const addBoardAction = createAsyncThunk("board/add", async(rejectWithValue) => {

  try {
    const { data } = await axios.post(API_URL + '/', authHeader());

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
      state.error = action?.payload;
      state.boards = null; 
    });
    builder.addCase(addBoardAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addBoardAction.fulfilled, (state, action) => {
      state.boards.push(action.payload);
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addBoardAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  }
});

export default boardsSlice.reducer