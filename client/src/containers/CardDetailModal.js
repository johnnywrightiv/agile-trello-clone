import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCardDetailModalClosed } from "../features/modalOpenSlice";


const CardDetailModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.cardDetailOpen);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setCardDetailModalClosed());
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

export default CardDetailModal;