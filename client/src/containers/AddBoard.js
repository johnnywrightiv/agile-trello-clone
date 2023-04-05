import { Col, Card } from "react-bootstrap";


const AddBoard = () => {

const handleClick = () => {
  console.log('addBoard');
}

return (
  <Col sm={4}>
    <Card onClick={handleClick}>
      <Card.Body>
        <Card.Title>+ Add New Board</Card.Title>
      </Card.Body>
    </Card>
  </Col>
)}

export default AddBoard;