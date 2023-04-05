import { Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addBoardAction } from "../features/boardsSlice";

const AddBoardForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    dispatch(addBoardAction(data.title));
    navigate('/boards');
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