import React, { createContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from '../columns/RenderColumns';
import { fetchBoardByIdAction } from '../../features/boardByIdSlice';
import NonAuthView from '../../components/NonAuthView';
import BoardTitleChange from './BoardTitleChange';

export const BoardIdContext = createContext();

const BoardView = () => {
  // connections to the redux store
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);


  // retrieve boardId from url parameters
  const { boardId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const refresh = async () => {
    await dispatch(fetchBoardByIdAction(boardId));
    }
    refresh();
  }, [ dispatch ]);
  
  return (
    <>
    { userIsLoggedIn ? 
      <BoardIdContext.Provider value={boardId}>
        <Container className="board-view pt-5">
          <BoardTitleChange />
          <hr className="board-divider" />
          <RenderColumns boardId={boardId}/>
        </Container>
      </BoardIdContext.Provider>  : <NonAuthView />  }
    </>
   
  )
};

export default BoardView;