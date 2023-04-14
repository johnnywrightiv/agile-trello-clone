import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import CreateCardModal from "../containers/CreateCardModal";
import { setColumnIndex } from "../features/columnInfoSlice";
import { setSecondModalOpen } from "../features/modalOpenSlice";


const CreateCardButton = (columnIndex) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(columnIndex);
    dispatch(setColumnIndex(columnIndex));
    dispatch(setSecondModalOpen());
  }

  return (
  <>
    <Button variant="light" size="sm" onClick={() => handleClick()}>+ Add New Card</Button>
    <CreateCardModal />
  </>
  )
}

export default CreateCardButton;