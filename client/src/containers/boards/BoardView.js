import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import RenderColumns from '../columns/RenderColumns';
import { fetchBoardByIdAction } from '../../features/boardByIdSlice';
import NonAuthView from '../../components/NonAuthView';
import BoardTitleChange from './BoardTitleChange';



const BoardView = () => {
  // connections to the redux store
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const board = useSelector((state) => state.boardById.board);

  // retrieve boardId from url parameters
  const { boardId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchBoardByIdAction(boardId));
  }, [ ]);
  
  const renderBoards = () => {
    if (board && Object.keys(board).length > 0) {
      return (
        <>
          <Container className="board-view pt-5">
            <BoardTitleChange />
            <hr className="board-divider" />
            <RenderColumns boardId={boardId}/>
          </Container>
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      { userIsLoggedIn ? <>{renderBoards()}</> : <NonAuthView />  }
    </>
   
  )
};

export default BoardView;