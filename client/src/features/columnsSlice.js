import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'http://localhost:3001/api/columns/'


//action
export const fetchColumnsAction = createAsyncThunk("columns/fetch", async(id, rejectWithValue) => {
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

export const addColumnAction = createAsyncThunk("column/add", async(body, rejectWithValue) => {
  try {
    const { data } = await axios.post(API_URL, body, authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  columns: [],
};

const columnsSlice = createSlice({
  name: "boardColumns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchColumnsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchColumnsAction.fulfilled, (state, action) => {
      state.boards = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchColumnsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.boards = null; 
    });
    builder.addCase(addColumnAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addColumnAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addColumnAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  }
});

export default columnsSlice.reducer