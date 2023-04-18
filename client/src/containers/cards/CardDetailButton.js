import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import CardDetailModal from './CardDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCardDetailModalOpen } from '../../features/modalOpenSlice';
import { fetchCardByIdAction } from '../../features/cardDetailSlice';
import { ColumnIndexContext } from "../columns/RenderColumns";
import { useContext } from 'react';

const CardDetailButton = (cardIndex) => {
  const columns = useSelector((state) => state.boardColumns.columns);
  const columnIndex = useContext(ColumnIndexContext);
  
  // need to get columnIndex
  const dispatch = useDispatch();
  const handleClick = async (index) => {
    const clickedCardIndex = index.cardIndex;
    const columnCards = columns[columnIndex].cardInfo;
    const clickedCardId = columnCards[clickedCardIndex]._id

    dispatch(fetchCardByIdAction(clickedCardId));
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