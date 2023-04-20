import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../features/boardsSlice';
import boardByIdReducer from '../features/boardByIdSlice';
import columnAndCardInfoReducer from '../features/columnAndCardInfoSlice';
import cardsReducer from '../features/cardsSlice';
import cardCommentsReducer from '../features/cardCommentsSlice';
import cardByIdReducer from '../features/cardDetailSlice';
import userAuthReducer from '../features/userAuthSlice';
import authMessageReducer from '../features/authMessageSlice';
import modalOpenClosedReducer from '../features/modalOpenSlice'





export const store = configureStore({
  reducer: {userBoards: boardsReducer,
    boardById: boardByIdReducer,
    // boardColumns: columnsReducer,
    columnAndCardInfo: columnAndCardInfoReducer,
    columnCards: cardsReducer,
    cardById: cardByIdReducer,
    cardComments: cardCommentsReducer,
    userAuth: userAuthReducer,
    authMessage: authMessageReducer,
    isModalOpen: modalOpenClosedReducer,
  }, 
  devTools: true,
});

