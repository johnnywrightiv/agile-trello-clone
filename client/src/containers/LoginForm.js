import { Button, Card, Form, FloatingLabel, Spinner } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../features/userAuthSlice"
import { useNavigate } from "react-router";
import { fetchBoardsAction } from "../features/boardsSlice";
import { useEffect, useState } from "react";
import LoginAlert from "../components/LoginAlert";

const LoginForm = () => {
  const user = useSelector((state) => state.userAuth);
  const errorMessage = useSelector((state) => state.authMessage);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const handleFormSubmit = async (data) => {
    setLoading(true);
    await dispatch(login(data));
    setLoading(false);
  }
  
  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(fetchBoardsAction())
      navigate('/');
    } else {
      if (errorMessage.message) {
        console.log(errorMessage.message);
        <LoginAlert variant="danger" message='test' />
      }
    }
  }, [user, errorMessage]);
  

  return (
    <div className="pt-5">
      <Card className="col-3 offset-5 text-center">
        <Card.Header>Login</Card.Header>
          <Card.Body>
          {errorMessage.message && <LoginAlert message={errorMessage.message} />}
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
              {loading ? (
                <Button variant="secondary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status"/>
                <span>{' '}Loading...</span>
              </Button>
              ) : (
                <Button variant="primary" type="submit">Login</Button>
              )}
            </Form>
          </Card.Body>

      </Card>
    </div>
  )
}

export default LoginForm
