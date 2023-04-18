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



function App() {
  const columnsData = useSelector((state) => state.boardColumns.columns);
  const [ columns, setColumns ] = useState(columnsData);

  const onDragEnd = result => {
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

    console.log(result);
    
   
    // console.log(index)
    // const column = columns[source.droppableId];
    // console.log(source.droppableId);
    // console.log(column);
    // const newCardInfo = Array.from(column.cardInfo);
    // newCardInfo.splice(source.index, 1);
    // newCardInfo.splice(destination.index, 0, draggableId);

    // const newColumn = {
    //   ...column,
    //   cardInfo: newCardInfo
    // }
    // console.log(newColumn);
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
