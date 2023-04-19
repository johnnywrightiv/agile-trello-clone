import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import boardByIdReducer from '../features/boardByIdSlice';
import columnsInfoReducer from '../features/columnInfoSlice';
import columnsReducer from '../features/columnsSlice';
import cardsReducer from '../features/cardsSlice';
import cardByIdReducer from '../features/cardDetailSlice';
import userAuthReducer from '../features/userAuthSlice';
import authMessageReducer from '../features/authMessageSlice';
import modalOpenClosedReducer from '../features/modalOpenSlice'




export const store = configureStore({
  reducer: {
    userBoards: boardsReducer,
    boardById: boardByIdReducer,
    // boardColumns: columnsReducer,
    columnIndex: columnsInfoReducer,
    columnCards: cardsReducer,
    cardById: cardByIdReducer,
    userAuth: userAuthReducer,
    authMessage: authMessageReducer,
    isModalOpen: modalOpenClosedReducer,
  },
  devTools: true,
});