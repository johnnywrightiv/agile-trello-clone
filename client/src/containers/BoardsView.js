import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardsAction } from '../features/boardsSlice';
import AddBoard from './AddBoard';

const BoardsView = () => {
  const boardsData = useSelector((state) => state.userBoards.boards);
  const boardsArray = boardsData.boards;
  const dispatch = useDispatch();
  

 useEffect(() => {
  dispatch(fetchBoardsAction());
 }, []); 

  const renderBoards = () => {
    if (boardsArray && boardsArray.length > 0) {
    return boardsData.boards.map((board) => (
      <Col sm={4} key={board._id}>
        <Link to={`/boards/${board._id}`} className="text-decoration-none">
          <Card>
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));
    } else {
      return null
    }
  };

  return (
    <Container className="pt-5">
      <Row xs={1} md={2} lg={3} className="g-4">
        {renderBoards()}
        <AddBoard />
      </Row>
    </Container>
  );
}


export default BoardsView;
