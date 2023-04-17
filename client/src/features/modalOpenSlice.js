import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open: false,
  createCardOpen: false,
  cardDetailOpen: false,
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
    setCreateCardModalOpen: (state, action) => {
      state.createCardOpen = true;
    },
    setCreateCardModalClosed: (state, action) => {
      state.createCardOpen = false;
    },
    setCardDetailModalOpen: (state, action) => {
      state.cardDetailOpen = true;
    },
    setCardDetailModalClosed: (state, action) => {
      state.cardDetailOpen = false;
    }
  },
});

const { reducer, actions } = modalOpenSlice;

export const { setModalOpen, setModalClosed, setCreateCardModalOpen, setCreateCardModalClosed, setCardDetailModalOpen, setCardDetailModalClosed } = actions;
export default reducer;