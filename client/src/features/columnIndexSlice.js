import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  index: null
}

const columnIndexSlice = createSlice({
  name: "columnIndex",
  initialState,
  reducers: {
    setColumnIndex: (state, action) => {
      state.index = action.payload.columnIndex;
    },
  },
});

const { reducer, actions } = columnIndexSlice;

export const { setColumnIndex } = actions;
export default reducer;