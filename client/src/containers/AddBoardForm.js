import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addBoardAction, fetchBoardsAction } from "../features/boardsSlice";
import { setModalClosed } from "../features/modalOpenSlice";

const AddBoardForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    await dispatch(addBoardAction(data));
    await dispatch(fetchBoardsAction());
    dispatch(setModalClosed());
  }

  return (
    <Card style={{ width: '18rem', marginRight: 'auto', marginLeft: 'auto' }} className="col=4  text-center">
      <Card.Header>Create Board</Card.Header>
      <Card.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}> 
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Control type="text" placeholder="Enter Title" {...register("title")} />
              <Form.Label>Board Title</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
      </Card.Body>
    </Card>
  )
}

export default AddBoardForm;