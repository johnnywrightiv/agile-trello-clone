import AddBoardForm from "./AddBoardForm";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalClosed } from "../features/modalOpenSlice";
import { Modal } from "react-bootstrap";

  
const CreateBoardModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.open);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setModalClosed());
  }
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>Create Board</Modal.Header>
      <Modal.Body>
        <AddBoardForm />
      </Modal.Body>
    </Modal>
  )
}

export default CreateBoardModal;