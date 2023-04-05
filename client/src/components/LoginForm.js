import { Button, Card, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/userAuthSlice"
import { useNavigate } from "react-router";
import { fetchBoardsAction } from "../features/boardsSlice";


const LoginForm = () => {
  const errorMessage = useSelector(state => state.authMessage.message);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    dispatch(login(data));
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      navigate('/boards');
    }
  }

  return (
    <div className="pt-5">
      <Card style={{ width: '18rem', marginRight: 'auto', marginLeft: 'auto' }} className="col=4 text-center">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(handleFormSubmit)}> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter Email" {...register("email")} required />
              <Form.Label>Email Address</Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" {...register("password")} required />
              <Form.Label>Password</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LoginForm