import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from '../columns/RenderColumns';
import { fetchBoardByIdAction } from '../../features/boardByIdSlice';
import NonAuthView from '../../components/NonAuthView';
import BoardTitleChange from './BoardTitleChange';
import LoadingSpinner from '../../components/LoadingSpinner';



const BoardView = () => {
  // connections to the redux store
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const board = useSelector((state) => state.boardById.board);
  const isLoading = useSelector((state) => state.boardById.isLoading);
  const [isLoadingFirstTime, setIsLoadingFirstTime] = useState(true);

  // retrieve boardId from url parameters
  const { boardId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      setIsLoadingFirstTime(false);
    }
  }, [isLoading]);
  
  useEffect(() => {
    dispatch(fetchBoardByIdAction(boardId));
  }, [boardId, dispatch]);
  
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
      {isLoading && isLoadingFirstTime ? (
        <LoadingSpinner />
      ) : userIsLoggedIn ? (
        <>{renderBoards()}</>
      ) : (
        <NonAuthView />
      )}
    </>
  );
};

export default BoardView;