import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';


export const store = configureStore({
  reducer: {
    userBoards: boardsReducer
  }
});