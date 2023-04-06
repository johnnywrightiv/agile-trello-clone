import { Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../features/modalOpenSlice";
import CreateBoardModal from "../containers/CreateBoardModal";

const AddBoard = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => {
    dispatch(setModalOpen());
  }

  return (
    <Col sm={4}>
      <Button onClick={handleClick}>+ Add New Board</Button>
      <CreateBoardModal />
    </Col>
)}

export default AddBoard;