import CreateCardForm from "./CreateCardForm";
import { useDispatch, useSelector } from "react-redux";
import { setCreateCardModalClosed } from "../../features/modalOpenSlice";
import { Modal } from "react-bootstrap";
import { useContext } from "react";
import { BoardIdContext } from "../boards/BoardView";
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";



const CreateCardModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.createCardOpen);
  const boardId = useContext(BoardIdContext);

  const dispatch = useDispatch();

  const handleModalClose = async () => {
    await dispatch(fetchBoardByIdAction(boardId));
    dispatch(setCreateCardModalClosed());
  }
  return (
    <Modal show={isOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>Create Card</Modal.Header>
      <Modal.Body>
        <CreateCardForm />
      </Modal.Body>
    </Modal>
  )
}

export default CreateCardModal;