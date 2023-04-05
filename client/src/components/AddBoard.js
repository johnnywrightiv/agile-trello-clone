import { Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { useState } from "react";
import AddBoardForm from "../containers/AddBoardForm";

const AddBoard = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <Col sm={4}>
      <Card onClick={handleClick}>
        <Card.Body>
          <Card.Title>+ Add New Board</Card.Title>
        </Card.Body>
      </Card>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Board Title">
          <AddBoardForm />
        </ReactModal>
    </Col>
)}

export default AddBoard;