import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import boardByIdReducer from '../features/boardByIdSlice';
import columnsReducer from '../features/columnsSlice';
import cardsReducer from '../features/cardsSlice';
import userAuthReducer from '../features/userAuthSlice';
import authMessageReducer from '../features/authMessageSlice';
import modalOpenClosedReducer from '../features/modalOpenSlice'




export const store = configureStore({
  reducer: {
    userBoards: boardsReducer,
    boardById: boardByIdReducer,
    boardColumns: columnsReducer,
    columnCards: cardsReducer,
    userAuth: userAuthReducer,
    authMessage: authMessageReducer,
    isModalOpen: modalOpenClosedReducer,
  },
  devTools: true,
});