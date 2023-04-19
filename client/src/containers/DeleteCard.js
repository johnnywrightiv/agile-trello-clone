import { useContext } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { deleteCardAction } from "../features/cardsSlice";
import { fetchColumnsAction } from "../features/columnsSlice";
import { ColumnIndexContext } from "./RenderColumns";


const DeleteCard = (cardIndex) => {
  const boardId = useSelector((state) => state.boardById.board._id);
  const columns = useSelector((state) => state.boardColumns.columns);

  const columnIndex = useContext(ColumnIndexContext);
  const allBoardCardInfo = columns.map(card => card.cardInfo);
  const columnCards = allBoardCardInfo[columnIndex];
  
  
  const dispatch = useDispatch();

  const handleClick = async (index) => {
    const columnId = columns[columnIndex]._id;
    const cardId = columnCards[index.cardIndex]._id;

    const requestBody = {
      columnId: columnId,
      cardId: cardId
    }

    await dispatch(deleteCardAction(requestBody));
    await dispatch(fetchColumnsAction(boardId));
  }

  return (
    <Card.Footer className="d-flex justify-content-end">
      <FontAwesomeIcon onClick={() => handleClick(cardIndex)} icon={faTrashCan} />
    </Card.Footer>
  )
}

export default DeleteCard;