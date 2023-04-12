import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModalClosed } from "../features/modalOpenSlice";


const CardModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.open);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setModalClosed());
  }
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Card detail view goes here</p>
      </Modal.Body>
    </Modal>
  )
}

export default CardModal;