import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBoardAction, fetchBoardsAction } from "../../features/boardsSlice";
import { setModalClosed } from "../../features/modalOpenSlice";

// Form to Create Board for User
const CreateBoardForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  // When User Submits form request is sent to server to 
  const handleFormSubmit = async (data) => {
    await dispatch(addBoardAction(data));
    await dispatch(fetchBoardsAction());
    dispatch(setModalClosed());
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}> 
      <FloatingLabel controlId="formBasicTitle" label={
        <span>
          <span className="red-required">* </span>
          Board Title
        </span>}>
        <Form.Control type="text" placeholder="Enter Board Title" className="mb-3" {...register("title")} required/>
      </FloatingLabel>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default CreateBoardForm;