import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardsAction } from '../../features/boardsSlice';
import NonAuthView from '../../components/NonAuthView';
import CreateBoardButton from '../../components/CreateBoardButton';
import LoadingSpinner from '../../components/LoadingSpinner';

const BoardsView = () => {
  const boardsArray = useSelector((state) => state.userBoards.boards);
  const isLoading = useSelector((state) => state.userBoards.loading);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchBoardsAction());
  }, [dispatch, ]); 
  
  const handleClick = async (e) => {
    const boardId = e.currentTarget.id;
    navigate('/boards/' + boardId);
  }
  
  const renderBoards = () => {
    if (boardsArray && boardsArray.length > 0) {
      return (boardsArray.map((board) => (
        <Col sm={4} key={board._id} id={board._id} onClick={handleClick}>
          <Card className="board-title">
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      )))
    } else {
      return null;
    }
  };

  return (
    <>
    { isLoading ? <LoadingSpinner /> : userIsLoggedIn ? 
      <Container className="pt-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {renderBoards()}
          <CreateBoardButton />
        </Row>
      </Container> : <NonAuthView />}
    
    </>
  );
}


export default BoardsView;
