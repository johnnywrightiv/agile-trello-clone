import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import CardDetailModal from './CardDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCardDetailModalOpen } from '../../features/modalOpenSlice';
import { fetchCardByIdAction } from '../../features/cardDetailSlice';
import { ColumnIndexContext } from "../columns/RenderColumns";
import { useContext } from 'react';
import { setCardId, setColumnIndex } from '../../features/columnAndCardInfoSlice';
import { fetchCardCommentsAction } from '../../features/cardCommentsSlice';

const CardDetailButton = (cardIndex) => {
  const board = useSelector((state) => state.boardById.board);
  const columns = board.columnInfo;
  // access column Index
  const columnIndex = useContext(ColumnIndexContext);
  
 
  const dispatch = useDispatch();

  const handleClick = async (index) => {
    const clickedCardIndex = index.cardIndex;
    const columnCards = columns[columnIndex].cardInfo;
    const clickedCardId = columnCards[clickedCardIndex]._id;
    await dispatch(setColumnIndex(columnIndex));
    await dispatch(fetchCardByIdAction(clickedCardId));
    await dispatch(fetchCardCommentsAction(clickedCardId));
    await dispatch(setCardId(clickedCardId));
    dispatch(setCardDetailModalOpen(true));
    
  }
  return (
    <>
      <FontAwesomeIcon className="ms-auto" icon={faPencil} onClick={()=> {handleClick(cardIndex)}} />
      <CardDetailModal />
    </>
  )
}

export default CardDetailButton;