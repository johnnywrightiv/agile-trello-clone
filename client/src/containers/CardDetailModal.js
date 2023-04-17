import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCardDetailModalClosed } from "../features/modalOpenSlice";
import CardTextChange from "./CardTextChange";
import CardTitleChange from "./CardTitleChange";


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
        <Modal.Title>
          <CardTitleChange />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardTextChange />
      </Modal.Body>
    </Modal>
  )
}

export default CardDetailModal;