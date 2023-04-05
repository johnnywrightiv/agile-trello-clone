import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardsAction } from '../features/boardsSlice';

const BoardsView = () => {
  // dummy array of board objects
  const boardsData = useSelector((state) => state.userBoards.boards);
  const dispatch = useDispatch();
  console.log(boardsData.boards);

 useEffect(() => {
  dispatch(fetchBoardsAction());
 }, []) 

  const renderBoards = () => {
    return boardsData.boards.map((board) => (
      <Col sm={4} key={board.id}>
        <Link to={`/boards/${board.id}`} className="text-decoration-none">
          <Card>
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));
  };

  const addBoard = () => {

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {renderBoards()}
        <Col sm={4}>
          <Card onClick={addBoard}>
            <Card.Body>
              <Card.Title>+ Add New Board</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
}

export default BoardsView;
