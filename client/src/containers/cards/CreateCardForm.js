import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";
import { addCardAction } from "../../features/cardsSlice";
import { setCreateCardModalClosed } from "../../features/modalOpenSlice";

// Form to Ceate Card for User Board Column
const CreateCardForm = () => {
  const boardData = useSelector((state) => state.boardById.board);
  const columnIds = boardData.columnInfo.map(column => column._id);
  const columnIndex = useSelector((state) => state.columnAndCardInfo.columnIndex);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // When User Submits form request is sent to server
  const handleFormSubmit = async (data) => {
    if (!data.title) {
      alert("Please enter a title for the card.");
      return;
    }
    const requestData = {
      title: data.title,
      text: data.text,
      columnId: columnIds[columnIndex]
    }
    await dispatch(addCardAction(requestData));
    await dispatch(fetchBoardByIdAction(boardData._id));
    dispatch(setCreateCardModalClosed());
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}> 
      <Form.Group className="mb-3" controlId="formCardTitle">
        <FloatingLabel controlId="formCardTitle" label={
          <span>
            <span className="red-required">* </span>
            Card Title
          </span>
        }>
          <Form.Control type="text" placeholder="Enter Card Title" {...register("title")} required />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCardText">
        <FloatingLabel controlId="formCardText" label={
          <span>
            <span className="red-required">* </span>
            Card Text
          </span>
        }>
          <Form.Control type="text" placeholder="Enter Card Text" {...register("text")} required />
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateCardForm;