
import { useDispatch, useSelector } from "react-redux";
import { setModalClosed } from "../../features/modalOpenSlice";
import { Modal } from "react-bootstrap";
import CreateBoardForm from "./CreateBoardForm";

  
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
        <CreateBoardForm />
      </Modal.Body>
    </Modal>
  )
}

export default CreateBoardModal;