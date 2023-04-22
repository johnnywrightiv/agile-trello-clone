import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios';
import authHeader from "../services/auth-header";

const API_URL = 'https://trello-clone-api-crxa.onrender.com/api/boards/'

export const fetchBoardByIdAction = createAsyncThunk("board/fetch", async(id, rejectWithValue) => {
  try {
    const { data } = await axios.get(API_URL + id, authHeader());
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const updateBoardTitleAction = createAsyncThunk("boardTitle/update", async({id, title}, rejectWithValue) => {
  console.log(id);
  try {
    const { data } = await axios.patch(API_URL + 'title/' + id, { title: title}, authHeader());
    console.log(data);
    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

export const updateColumnOrderAction = createAsyncThunk("columnOrder/update", async({ boardId, newColumnOrder }, rejectWithValue) => {
console.log(newColumnOrder);
  try {
    const { data } = await axios.patch(API_URL + 'column-reorder/' + boardId, { newColumnOrder: newColumnOrder }, authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
}); 

export const reorderCardsInSameColumn = createAsyncThunk("cards/reorder", async (body, rejectWithValue) => {

  try {
    const { data } = await axios.patch('https://trello-clone-api-crxa.onrender.com/api/cards/same-column-reorder', body, authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
});

export const reorderCardsInDifferentColumn = createAsyncThunk("cards/reorder-different", async (body, rejectWithValue) => {

  try {
    const { data } = await axios.patch('https://trello-clone-api-crxa.onrender.com/api/cards/different-column-reorder', body, authHeader());

    return data;
  } catch (error) {
    if (!error?.response) {
      throw error;
    }
    return rejectWithValue(error?.response?.data);
  }
})

const initialState = {
  board: {}
};

const boardByIdSlice = createSlice({
  name: "BoardById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoardByIdAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBoardByIdAction.fulfilled, (state, action) => {
      state.board = action?.payload.board;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(fetchBoardByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action?.payload;
      state.board = null; 
    });
    builder.addCase(updateBoardTitleAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateBoardTitleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateBoardTitleAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(updateColumnOrderAction.fulfilled, (state, action) => {
      state.board = action?.payload.updatedBoard;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(updateColumnOrderAction.pending, (state, {meta}) => {
      console.log('meta', meta);
      state.board = {...state.board, columnInfo: meta.arg.newColumnOrder.map(columnId => {
        const column = state.board.columnInfo.find(column => column._id === columnId);
        return column;
      })};
      state.loading = true;
    });
    builder.addCase(updateColumnOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(reorderCardsInSameColumn.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(reorderCardsInSameColumn.pending, (state, {meta}) => {
      const { sameColumnId } = meta.arg
      const columnIndex = state.board.columnInfo.findIndex(column => column._id === sameColumnId);
    
      const updatedCardInfo = meta.arg.sameColumnCardIds.map(cardId => {
        const cardIndex = state.board.columnInfo[columnIndex].cardInfo.findIndex(card => card._id === cardId);
    
        return {
          ...state.board.columnInfo[columnIndex].cardInfo[cardIndex],
        };
      });
    
      state.board.columnInfo[columnIndex].cardInfo = updatedCardInfo;
      state.loading = true;
    });
    builder.addCase(reorderCardsInSameColumn.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(reorderCardsInDifferentColumn.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(reorderCardsInDifferentColumn.pending, (state, { meta }) => {
      const { addedColumnCardIds, addedColumnId, removedColumnIds, removedColumnId } = meta.arg;
     
      // Find the index of the origin column
      const originColumnIndex = state.board.columnInfo.findIndex(column => column._id === removedColumnId);
    
      // Find the index of the destination column
      const destinationColumnIndex = state.board.columnInfo.findIndex(column => column._id === addedColumnId);
    
      // Find the card that is being moved
      const originCards= state.board.columnInfo[originColumnIndex].cardInfo;
      
      const card = originCards.find(card => addedColumnCardIds.includes(card._id))
      
      // Find the index of the card in the origin column
      const originCardIndex = originCards.findIndex(c => c._id === card._id);
    
      // Remove the card from the origin column
      originCards.splice(originCardIndex, 1);
    
      // Insert the card into the destination column at the specified index
      const destinationCards = state.board.columnInfo[destinationColumnIndex].cardInfo;
      const destinationCardIndex = addedColumnCardIds.indexOf(card._id);
      destinationCards.splice(destinationCardIndex, 0, card);
   
      state.loading = true;
    }); 
    builder.addCase(reorderCardsInDifferentColumn.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
}})

export default boardByIdSlice.reducer