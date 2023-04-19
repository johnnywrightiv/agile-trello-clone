import { Button, Card, Form, FloatingLabel} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/userAuthSlice"
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { fetchBoardsAction } from "../features/boardsSlice";


const LoginForm = () => {
  const user = useSelector((state) => state.userAuth);
  const errorMessage = useSelector((state) => state.authMessage);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    await dispatch(login(data));
  }
  
  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchBoardsAction())
      navigate('/');
    } else {
      if (errorMessage.message) {
      console.log(errorMessage)
      }
    }
}, [user, errorMessage]);
  

  return (
    <div className="pt-5">
      <Card className="col-3 offset-5 text-center">
        <Card.Header>Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(handleFormSubmit)}> 
              <FloatingLabel controlId="formBasicEmail" className="mb-3" label={
                <span>
                  <span className="red-required">* </span>
                  Email Address
                </span>}>
                <Form.Control type="email" placeholder="Enter Email" {...register("email")} required />
              </FloatingLabel>

              <FloatingLabel controlId="formBasicPassword" className="mb-3" label={
                <span>
                  <span className="red-required">* </span>
                  Password
                </span>}>
                <Form.Control type="password" placeholder="Password" {...register("password")} required />
              </FloatingLabel>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Card.Body>

      </Card>
    </div>
  )
}

export default LoginForm