import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  columnIndex: 0,
  cardId: null
}

const columnAndCardInfoSlice = createSlice({
  name: "columnIndex",
  initialState,
  reducers: {
    setColumnIndex: (state, action) => {
      state.columnIndex = action.payload;
    },
    setCardId: (state, action) => {
      state.cardId = action.payload;
    }
  },
});

const { reducer, actions } = columnAndCardInfoSlice;

export const { setColumnIndex, setCardId } = actions;
export default reducer;