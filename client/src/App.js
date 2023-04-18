import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { DragDropContext } from 'react-beautiful-dnd';

import NavBar from './components/Navbar';
import HomePage from './components/HomePage';
import NotFound from './components/NotFound';
import SignUpForm from './components/SignUpForm';
import LoginForm from './containers/LoginForm';
import BoardView from './containers/boards/BoardView';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reorderCardsInSameColumn } from './features/cardsSlice';
import { fetchBoardByIdAction } from './features/boardByIdSlice';




function App() {
  const columns = useSelector((state) => state.boardColumns.columns);
  const [ cardOrder, setCardOrder ] = useState();


  const dispatch = useDispatch();

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // if card is dropped in the same column
    if (source.droppableId === destination.droppableId) {
      // locate the column in the store 
      const column = columns.find(column => source.droppableId === column._id);
      console.log(column);
      const cards = column.cardInfo;
      // logic to create an array of ids listing the card order in the column
      const cardOrderById = cards.map(card => card._id);
      const draggedCard = cardOrderById.splice(source.index, 1);
      // updated card order
      cardOrderById.splice(destination.index, 0, ...draggedCard);
      const requestBody = {
        sameColumnId: column._id,
        sameColumnCardIds: cardOrderById
      }

      await dispatch(reorderCardsInSameColumn(requestBody));
      dispatch(fetchBoardByIdAction(column.boardId));
      
    }

    
    // this.props.dispatch(sort(
    //   source.droppableId,
    //   destination.droppableId,
    //   source.index,
    //   destination.index,
    //   draggableId
    // ))
    

    // console.log(result);
  };
  return (
    <>
      {/* Nav Container */}
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
