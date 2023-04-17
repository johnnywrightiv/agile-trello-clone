import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import CardDetailModal from '../containers/CardDetailModal';
import { useDispatch } from 'react-redux';
import { setCardDetailModalOpen } from '../features/modalOpenSlice';

const CardDetailButton = (cardIndex) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(cardIndex);
    dispatch(setCardDetailModalOpen(true));
  }
  return (
    <>
      <FontAwesomeIcon className="ms-auto" icon={faPencil} onClick={()=> {handleClick()}} />
      <CardDetailModal />
    </>
  )
}

export default CardDetailButton;