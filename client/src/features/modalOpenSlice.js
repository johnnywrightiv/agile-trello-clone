import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open: false,
  secondOpen: false
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
    setSecondModalOpen: (state, action) => {
      state.secondOpen = true;
    },
    setSecondModalClosed: (state, action) => {
      state.secondOpen = false;
    },
  },
});

const { reducer, actions } = modalOpenSlice;

export const { setModalOpen, setModalClosed, setSecondModalOpen, setSecondModalClosed } = actions;
export default reducer;