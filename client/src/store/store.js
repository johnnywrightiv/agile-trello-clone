import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import boardByIdReducer from '../features/boardByIdSlice';
import columnsIndexReducer from '../features/columnIndexSlice';
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
    columnIndex: columnsIndexReducer,
    columnCards: cardsReducer,
    userAuth: userAuthReducer,
    authMessage: authMessageReducer,
    isModalOpen: modalOpenClosedReducer,
  },
  devTools: true,
});