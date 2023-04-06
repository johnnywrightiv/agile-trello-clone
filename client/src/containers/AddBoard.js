import { Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import AddBoardForm from "./AddBoardForm";
import { setModalOpen, setModalClosed } from "../features/modalOpenSlice";

const AddBoard = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.isModalOpen.open);

  const handleClick = () => {
    dispatch(setModalOpen());
  }

  const handleButtonClick = () => {
    dispatch(setModalClosed());
  }

  return (
    <Col sm={4}>
      <Button onClick={handleClick}>+ Add New Board</Button>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        contentLabel="Board Title"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            width: '30%',
            height: '50%',
            margin: 'auto',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px 2px rgba(0, 0, 0, 0.25)'
          }
        }}>
          <Button onClick={handleButtonClick}>X</Button>
          <AddBoardForm />
        </ReactModal>
    </Col>
)}

export default AddBoard;