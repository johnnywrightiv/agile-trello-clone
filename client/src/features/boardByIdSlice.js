import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'https://trello-clone-api-crxa.onrender.com/api/boards/'

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

export const updateBoardTitleAction = createAsyncThunk("boardTitle/update", async({id, title}, rejectWithValue) => {
  console.log(id);
  try {
    const { data } = await axios.patch(API_URL + 'title/' + id, { title: title}, authHeader());
    console.log(data);
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const updateColumnOrderAction = createAsyncThunk("columnOrder/update", async({ boardId, newColumnOrder }, rejectWithValue) => {
console.log(newColumnOrder);
  try {
    const { data } = await axios.patch(API_URL + 'column-reorder/' + boardId, { newColumnOrder: newColumnOrder }, authHeader());

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
      state.board = action?.payload.board;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchBoardByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.board = null; 
    });
    builder.addCase(updateBoardTitleAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBoardTitleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateBoardTitleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(updateColumnOrderAction.fulfilled, (state, action) => {
      state.board = action?.payload.updatedBoard;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateColumnOrderAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateColumnOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
}})

export default boardByIdSlice.reducer