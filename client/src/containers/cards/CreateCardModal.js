import CreateCardForm from "./CreateCardForm";
import { useDispatch, useSelector } from "react-redux";
import { setCreateCardModalClosed } from "../../features/modalOpenSlice";
import { Modal } from "react-bootstrap";
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";



const CreateCardModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.createCardOpen);
  const board = useSelector((state) => state.boardById.board)

  const dispatch = useDispatch();

  const handleModalClose = async () => {
    await dispatch(fetchBoardByIdAction(board._id));
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