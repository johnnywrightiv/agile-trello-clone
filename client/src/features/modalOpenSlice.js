import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open: false
}

const modalOpenSlice = createSlice({
  name: "modalOpen",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.open = true;
    },
    setModalClosed: (state, action) => {
      state.open = false;
    },
  },
});

const { reducer, actions } = modalOpenSlice;

export const { setModalOpen, setModalClosed } = actions;
export default reducer;