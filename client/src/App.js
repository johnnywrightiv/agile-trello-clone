import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './containers/Navbar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import SignUpForm from './components/SignUpForm';
import LoginForm from './containers/LoginForm';
import BoardView from './containers/boards/BoardView';
import { useSelector } from 'react-redux';
import { fetchBoardByIdAction, reorderCardsInDifferentColumn, reorderCardsInSameColumn, updateColumnOrderAction  } from './features/boardByIdSlice';
import { useDispatch } from 'react-redux';

function App() {  
  const board = useSelector((state) => state.boardById.board);
  const columns = board.columnInfo;

  const dispatch = useDispatch();

  const onDragEnd = async (result) => {
    

    const { destination, source, draggableId, type } = result;

    
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Logic to drag and drop columns
    if (type === 'column') {
      const columnOrder = columns.map(column => column._id);
      const draggedColumn = columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, ...draggedColumn);
      const requestBody = {
        newColumnOrder: columnOrder,
        boardId: board._id
      }
      dispatch(updateColumnOrderAction(requestBody));
      return;
    }

    // if card is dropped in the same column
    if (source.droppableId === destination.droppableId) {
      // locate the column in the store 
      const column = columns.find(column => source.droppableId === column._id);
      // logic to create an array of ids listing the card order in the column
      const cardOrderById = column.cardInfo.map(card => card._id);
      const draggedCard = cardOrderById.splice(source.index, 1);
      // updated card order
      cardOrderById.splice(destination.index, 0, ...draggedCard);

      const sameColumnRequestBody = {
        sameColumnId: column._id,
        sameColumnCardIds: cardOrderById
      }
    
      await dispatch(reorderCardsInSameColumn(sameColumnRequestBody));
      // await dispatch(fetchBoardByIdAction(board._id));
      return;
    }

    // if card is dropped in a different column
    if (source.droppableId !== destination.droppableId) {
      // locate the columns in the store
      const startColumn = columns.find(column => source.droppableId === column._id);
      const finishColumn = columns.find(column => destination.droppableId === column._id);
      // logic to create an array of ids listing the card order of the columns
      const startColumnCardOrder = startColumn.cardInfo.map(card => card._id);
      const finishColumnCardOrder = finishColumn.cardInfo.map(card => card._id);
      // remove draggedCard from startColumn
      const draggedCard = startColumnCardOrder.splice(source.index, 1);
      // add draggedCard to finishColumn
      finishColumnCardOrder.splice(destination.index, 0, ...draggedCard);
      
      const differentColumnRequestBody = {
        removedColumnId: startColumn._id,
        removedColumnCardIds: startColumnCardOrder,
        addedColumnId: finishColumn._id,
        addedColumnCardIds: finishColumnCardOrder
      }

      await dispatch(reorderCardsInDifferentColumn(differentColumnRequestBody));
      // dispatch(fetchBoardByIdAction(board._id));
      return;
    }

  }
  return (
    <>
      <Container fluid>
        <NavBar />
      </Container>
    <br />
    
      {/* Body Container (render components within this container. can just use rows in the components i think)*/}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="md-4 mt-5">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/boards/:boardId" element={<BoardView />} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            </Routes>
        </Container>
      </DragDropContext>
    </>
  );
}


export default App;
