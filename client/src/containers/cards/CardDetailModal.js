import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchColumnsAction } from "../../features/columnsSlice";
import { setCardDetailModalClosed } from "../../features/modalOpenSlice";
import CardTextChange from "./CardTextChange";
import CardTitleChange from "./CardTitleChange";
import RenderCardComments from "./RenderCardComments";
import CardLabels from "./CardLabels"
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";



const CardDetailModal = () => {
  const isOpen = useSelector((state) => state.isModalOpen.cardDetailOpen);
  const board = useSelector((state) => state.boardById.board);
  const columnIndex = useSelector((state) => state.columnAndCardInfo.columnIndex);
  const column = board.columnInfo[columnIndex];

  const dispatch = useDispatch();

  const handleModalClose = async () => {
    await dispatch(fetchBoardByIdAction(board._id))
    dispatch(setCardDetailModalClosed());
  }
  if (columnIndex >= 0) {
    return (
      <Modal show={isOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <CardTitleChange />
            <h6>in list <u>{column.title}</u></h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardLabels />
          <Modal.Title> Description </Modal.Title>
          <CardTextChange />
          <hr className="board-divider" />
          <RenderCardComments />
        </Modal.Body>
      </Modal>
    )
  } else {
    return null;
  }
  
}

export default CardDetailModal;