import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'https://trello-clone-api-crxa.onrender.com/api/cards/'

export const fetchCardByIdAction = createAsyncThunk("card/fetch", async(id, rejectWithValue) => {
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

export const updateCardTitleAction = createAsyncThunk("cardTitle/update", async({id, title}, rejectWithValue) => {
  console.log(id);
  try {
    const { data } = await axios.patch(API_URL + 'title/' + id, { title: title}, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const updateCardTextAction = createAsyncThunk("cardText/update", async({id, text}, rejectWithValue) => {
  try {
    const { data } = await axios.patch(API_URL + 'text/' + id, { text: text }, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const addCardLabelAction = createAsyncThunk("cardLabel/update", async(body, rejectWithValue) => {
  try {
    const { data } = await axios.post('https://trello-clone-api-crxa.onrender.com/api/labels/', body, authHeader());
    console.log(data);
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const deleteCardLabelAction = createAsyncThunk("cardLabel/delete", async(id, rejectWithValue) => {
  try {
    const { data } = await axios.delete('https://trello-clone-api-crxa.onrender.com/api/labels/' + id, authHeader())
    return data;
  }catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

const initialState = {
  card: {}
};

const cardByIdSlice = createSlice({
  name: "CardById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCardByIdAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCardByIdAction.fulfilled, (state, action) => {
      state.card = action?.payload.card;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchCardByIdAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.card = null; 
    });
    builder.addCase(updateCardTitleAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCardTitleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateCardTitleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(updateCardTextAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCardTextAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateCardTextAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(addCardLabelAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addCardLabelAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(addCardLabelAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
  }
});

export default cardByIdSlice.reducer