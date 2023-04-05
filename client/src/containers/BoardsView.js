import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoardsAction } from '../features/boardsSlice';
import AddBoard from './AddBoard';

const BoardsView = () => {
  // dummy array of board objects
  const boardsData = useSelector((state) => state.userBoards.boards);
  const dispatch = useDispatch();
  const boardsArray = boardsData.boards;
  console.log(boardsArray);

 useEffect(() => {
  dispatch(fetchBoardsAction());
 }, []) 

  const renderBoards = () => {
    return boardsData.boards.map((board) => (
      <Col sm={4} key={board.id}>
        <Link to={`/boards/${board._id}`} className="text-decoration-none">
          <Card>
            <Card.Body>
              <Card.Title>{board.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));
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
