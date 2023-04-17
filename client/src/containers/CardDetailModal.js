import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCardDetailModalClosed } from "../features/modalOpenSlice";


const CardDetailModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.cardDetailOpen);
  const cardDetails = useSelector((state) => state.cardById.card);

  console.log(cardDetails);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(setCardDetailModalClosed());
  }
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cardDetails.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cardDetails.text}
      </Modal.Body>
    </Modal>
  )
}

export default CardDetailModal;