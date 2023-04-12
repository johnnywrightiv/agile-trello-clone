import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardsAction } from '../features/boardsSlice';
import CreateBoard from '../components/CreateBoardButton';
import { fetchBoardByIdAction } from '../features/boardByIdSlice';
import { fetchColumnsAction } from '../features/columnsSlice';
import NonAuthView from '../components/NonAuthView';
import { fetchCardsAction } from '../features/cardsSlice';
import CreateBoardButton from '../components/CreateBoardButton';


const BoardsView = () => {
  const boardsArray = useSelector((state) => state.userBoards.boards);
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    dispatch(fetchBoardsAction());
  }, []); 

  const handleClick = async (e) => {
    const id = e.currentTarget.id;
    await dispatch(fetchBoardByIdAction(id));
    await dispatch(fetchColumnsAction(id));
    navigate('/boards/' + id);
  }

  const renderBoards = () => {
    if (boardsArray && boardsArray.length > 0) {
    return boardsArray.map((board) => (
      <Col sm={4} key={board._id} id={board._id} onClick={handleClick}>
        <Card>
          <Card.Body>
            <Card.Title>{board.title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    ));
    } else {
      return null
    }
  };

  return (
    <>
    { userIsLoggedIn ? <Container className="pt-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {renderBoards()}
        <CreateBoardButton />
      </Row>
    </Container> : <NonAuthView />}
    </>
    
  );
}


export default BoardsView;
