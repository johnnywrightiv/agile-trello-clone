import { useDispatch, useSelector } from "react-redux";
import { setModalClosed } from "../../features/modalOpenSlice";
import { Modal } from "react-bootstrap";
import CreateColumnForm from "./CreateColumnForm";

  
const CreateColumnModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.open);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setModalClosed());
  }
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>Create Column</Modal.Header>
      <Modal.Body>
        <CreateColumnForm />
      </Modal.Body>
    </Modal>
  )
}

export default CreateColumnModal;