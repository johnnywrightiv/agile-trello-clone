import { Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import AddBoardForm from "./AddBoardForm";
import { setModalOpen } from "../features/modalOpenSlice";

const AddBoard = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isModalOpen.open);
  console.log(isOpen);

  const handleClick = () => {
    dispatch(setModalOpen());
  }

  return (
    <Col sm={4}>
      <Button onClick={handleClick}>+ Add New Board</Button>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Board Title">
          <AddBoardForm />
        </ReactModal>
    </Col>
)}

export default AddBoard;