import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'https://trello-clone-api-crxa.onrender.com/api/comments/';

export const fetchCardCommentsAction = createAsyncThunk("comments/fetch", async(cardId, rejectWithValue) => {
  try {
    const { data } = await axios.get(API_URL + 'all/' + cardId, authHeader());
    console.log(data);
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const addCardCommentAction = createAsyncThunk("comments/add", async(body, rejectWithValue) => {
  try {
    console.log(body);

    const { data } = await axios.post(API_URL, body, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const deleteCardCommentAction = createAsyncThunk("comment/delete", async(commentId, rejectWithValue) => {
  try {
    // request is either parameters or in body
    const { data } = await axios.delete(API_URL + commentId, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

const initialState = {
  cardComments: [],
};

const cardCommentsSlice = createSlice({
  name: "cardComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardCommentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCardCommentsAction.fulfilled, (state, action) => {
      state.cardComments = action?.payload.comments;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCardCommentsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.CardComments = null; 
    });
    builder.addCase(addCardCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCardCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addCardCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(deleteCardCommentAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCardCommentAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(deleteCardCommentAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  }
});

export default cardCommentsSlice.reducer;