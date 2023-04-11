import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from './RenderColumns';
import { fetchBoardByIdAction, updateBoardTitleAction } from '../features/boardByIdSlice';
import NonAuthView from '../components/NonAuthView';

const BoardView = () => {
  const boardData = useSelector((state) => state.boardById);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const [ boardTitle, setBoardTitle ] = useState(boardData.board.title)
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);

  const { boardId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBoard() {
      const response = await dispatch(fetchBoardByIdAction(boardId));
      return response
    }
    fetchBoard();
  }, []);
  

  const handleBoardTitleClick = () => {
    setIsEditingBoardTitle(true);
  }

  const handleBoardTitleChange = async (event) => {
    setBoardTitle(event.target.value);
  };

   const handleBoardTitleChangeClick = async () => {
    setIsEditingBoardTitle(false);
    const bodyRequest = {
      id: boardId,
      title: boardTitle
    }
    console.log(bodyRequest)
    await dispatch(updateBoardTitleAction(bodyRequest));
    dispatch(fetchBoardByIdAction(boardId));
   }
  
  return (
    <>
    { userIsLoggedIn ? <Container className="board-view pt-5">
      {isEditingBoardTitle ? <input type="text" value={boardTitle} onChange={(event) => handleBoardTitleChange(event)} onClick={handleBoardTitleChangeClick} /> : <h2 className="board-title" onClick={handleBoardTitleClick}>
     {boardTitle}
    </h2>}
   
    <hr className="board-divider" />

    <Row className="column-row flex-nowrap overflow-auto" style={{ height: 'calc(100vh - 120px)' }}>
      <RenderColumns />
    </Row> 
  </Container>  : <NonAuthView />  }
    </>
   
  )
};


// {isEditingColumnTitle && editingColumnIndex === columnIndex ? (
//   <input type="text" value={column.title} onChange={(event) => handleColumnTitleChange(event, columnIndex)} onBlur={handleColumnTitleBlur} style={{ width: '50%' }}/>
// ) : (
//   <h3 className="column-title" onClick={() => handleColumnTitleClick(columnIndex)}>
//     {column.title}
//   </h3>
// )}
export default BoardView;