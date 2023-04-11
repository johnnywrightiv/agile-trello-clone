import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from './RenderColumns';
import { fetchBoardByIdAction } from '../features/boardByIdSlice';
import { setModalOpen, setModalClosed } from '../features/modalOpenSlice';
import NonAuthView from '../components/NonAuthView';

const BoardView = () => {
  // const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);

  // const [boardTitle, setBoardTitle] = useState('Board Title');
  // const [columns, setColumns] = useState([
  //   {
  //     title: 'Column 1',
  //     cards: ['Card 1', 'Card 2']
  //   },
  //   {
  //     title: 'Column 2',
  //     cards: ['Card 3', 'Card 4']
  //   },
  //   {
  //     title: 'Column 3',
  //     cards: ['Card 5']
  //   }
  // ]);

  const boardData = useSelector((state) => state.boardById.board)
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const isOpen = useSelector((state) => state.isModalOpen.open); 
  const { boardId } = useParams();
 
  const boardTitle = boardData.board.title;
  console.log(boardData.hasOwnProperty('board'));
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBoard() {
      const response = await dispatch(fetchBoardByIdAction(boardId));
      return response
    }
    fetchBoard();
  }, []);
  

 

  // const handleBoardTitleChange = (event) => {
  //   setBoardTitle(event.target.value);
  // };










  const handleModalClose = () => {
    dispatch(setModalClosed());
  };
  
  
  return (
    <>
    { userIsLoggedIn ? <Container className="board-view pt-5">
    <h2 className="board-title">
     {boardTitle}
    </h2>
    <hr className="board-divider" />

    <Row className="column-row flex-nowrap overflow-auto" style={{ height: 'calc(100vh - 120px)' }}>
      <RenderColumns />
    </Row>
    
  </Container>  : <NonAuthView />  }
    </>
   
  )
};

export default BoardView;