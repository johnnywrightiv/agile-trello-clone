import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'https://trello-clone-api-crxa.onrender.com/api/cards/'


//action
export const fetchCardsAction = createAsyncThunk("cards/fetch", async(id, rejectWithValue) => {

  try {
    const { data } = await axios.get(API_URL + 'all/' + id,  authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const addCardAction = createAsyncThunk("card/add", async(body, rejectWithValue) => {

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

export const deleteCardAction = createAsyncThunk("card/delete", async(body, rejectWithValue) => {
  const cardId = body.cardId;

  try {
    const { data } = await axios.delete(API_URL + cardId,  authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});


const initialState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "columnCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCardsAction.fulfilled, (state, action) => {
      state.cards = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCardsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.cards = null; 
    });
    builder.addCase(addCardAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCardAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addCardAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  }
});

export default cardsSlice.reducer