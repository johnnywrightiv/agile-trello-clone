import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import userAuthReducer from '../features/userAuthSlice';
import modalOpenClosedReducer from '../features/modalOpenSlice'
import authMessageReducer from '../features/authMessageSlice';


export const store = configureStore({
  reducer: {
    userBoards: boardsReducer,
    userAuth: userAuthReducer,
    authMessage: authMessageReducer,
    isModalOpen: modalOpenClosedReducer,
  },
  devTools: true,
});