import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";
import { addColumnAction } from "../../features/columnsSlice";
import { setModalClosed } from "../../features/modalOpenSlice";

// Form to Ceate Column for User Board
const CreateColumnForm = () => {
  const boardData = useSelector((state) => state.boardById.board);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // When User Submits form request is sent to server to 
  const handleFormSubmit = async (data) => {
    const requestData = {
      title: data.title,
      boardId: boardData._id
    }
    await dispatch(addColumnAction(requestData));
    await dispatch(fetchBoardByIdAction(boardData._id));
    dispatch(setModalClosed());
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}> 
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <FloatingLabel controlId="formBasicTitle" label={
          <span>
            <span className="red-required">* </span>
            Column Title
          </span>
        }>
          <Form.Control type="text" placeholder="Enter Column Title" {...register("title")} required/>
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateColumnForm;