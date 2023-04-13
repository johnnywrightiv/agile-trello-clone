import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addCardAction } from "../features/cardsSlice";
import { addColumnAction, fetchColumnsAction } from "../features/columnsSlice";
import { setSecondModalClosed } from "../features/modalOpenSlice";

// Form to Ceate Card for User Board Column
const CreateCardForm = () => {
  const boardData = useSelector((state) => state.boardById.board);
  const columnIds = boardData.columnOrder;
  const columnIndex = useSelector((state) => state.columnIndex.index);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // When User Submits form request is sent to server
  const handleFormSubmit = async (data) => {
    const requestData = {
      title: data.title,
      text: data.text,
      columnId: columnIds[columnIndex]
    }
    console.log(requestData);
    console.log(boardData._id);
    await dispatch(addCardAction(requestData));
    await dispatch(fetchColumnsAction(boardData._id));
    dispatch(setSecondModalClosed());
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}> 
      <Form.Group className="mb-3" controlId="formCardTitle">
        <Form.Control type="text" placeholder="Enter Card Title" {...register("title")} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCardText">
        <Form.Control type="text" placeholder="Enter Card Text" {...register("text")} />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateCardForm;