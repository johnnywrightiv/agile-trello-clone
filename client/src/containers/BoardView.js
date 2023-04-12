import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from './RenderColumns';
import { fetchBoardByIdAction, updateBoardTitleAction } from '../features/boardByIdSlice';
import NonAuthView from '../components/NonAuthView';
import { fetchColumnsAction } from '../features/columnsSlice';

const BoardView = () => {
  // connections to the redux store
  const boardData = useSelector((state) => state.boardById.board);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  // local state
  const [ boardTitle, setBoardTitle ] = useState(boardData.title)
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);

  // retrieve boardId from url parameters
  const { boardId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const refresh = async () => {
    await dispatch(fetchBoardByIdAction(boardId));
    await dispatch(fetchColumnsAction(boardId));
    // console.log(boardData.title)
    setBoardTitle(boardData.title);
    // console.log(boardTitle)
    }
    refresh();
  }, [ ]);
  
  // console.log(boardTitle)

  // function that alters isEditingBoardTitle state to true - causes input box to appear for user to edit the title of the board
  const handleBoardTitleClick = () => {
    setIsEditingBoardTitle(true);
  }
  // function that sets local state as user changes the title
  const handleBoardTitleChange = async (event) => {
    setBoardTitle(event.target.value);
  };

  // function that closes the edit box and dipatches the patch function to update the title of the board.  It also fetches the boardById in order to update the redux store with the new information.
  const handleBoardTitleChangeClick = async () => {
    setIsEditingBoardTitle(false);
    const bodyRequest = {
      id: boardData._id,
      title: boardTitle
    }
    await dispatch(updateBoardTitleAction(bodyRequest));
    await dispatch(fetchBoardByIdAction(boardId));
   }
  
  return (
    <>
    { userIsLoggedIn ? <Container className="board-view pt-5">
      {isEditingBoardTitle ? <input type="text" value={boardTitle} onChange={(event) => handleBoardTitleChange(event)} onBlur={handleBoardTitleChangeClick} /> : <h2 className="board-title" onClick={handleBoardTitleClick}>
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

export default BoardView;