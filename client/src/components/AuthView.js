import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';

function AuthView() {
  // dummy array of board objects
  const [boards, setBoards] = useState([
    { id: 1, title: 'Board 1' },
    { id: 2, title: 'Board 2' },
    { id: 3, title: 'Board 3' }
  ]);

  const renderBoards = () => {
    return boards.map((board) => (
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
    const newBoard = {
      id: boards.length + 1,
      title: `Board ${boards.length + 1}`,
    };
    setBoards([...boards, newBoard]);
  };

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

export default AuthView;
