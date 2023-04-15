import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  index: null,
  id: null
}

const columnInfoSlice = createSlice({
  name: "columnIndex",
  initialState,
  reducers: {
    setColumnIndex: (state, action) => {
      state.index = action.payload;
    },
    setColumnId: (state, action) => {
      state.id = action.payload.columnId;
    }
  },
});

const { reducer, actions } = columnInfoSlice;

export const { setColumnIndex } = actions;
export default reducer;