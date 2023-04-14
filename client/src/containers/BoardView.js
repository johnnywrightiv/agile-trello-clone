import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderColumns from './RenderColumns';
import { fetchBoardByIdAction } from '../features/boardByIdSlice';
import NonAuthView from '../components/NonAuthView';
import { fetchColumnsAction } from '../features/columnsSlice';
import BoardTitleChange from './BoardTitleChange';

const BoardView = () => {
  // connections to the redux store
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);


  // retrieve boardId from url parameters
  const { boardId } = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const refresh = async () => {
    await dispatch(fetchBoardByIdAction(boardId));
    await dispatch(fetchColumnsAction(boardId));

    }
    refresh();
  }, [ ]);
  
  return (
    <>
    { userIsLoggedIn ? 
      <Container className="board-view pt-5">
        <BoardTitleChange />
        <hr className="board-divider" />
        <Row className="column-row flex-nowrap overflow-auto" >
          <RenderColumns boardId={boardId}/>
        </Row> 
      </Container>  : <NonAuthView />  }
    </>
   
  )
};

export default BoardView;