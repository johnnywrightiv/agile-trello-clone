import { Button, Card, Form, FloatingLabel, Spinner} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../features/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SignupAlert from "./SignupAlert";
import { useState } from "react";


const SignUpForm = () => {
  const errorMessage = useSelector((state) => state.authMessage);
  const user = useSelector((state) => state.userAuth);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (data) => {
    setLoading(true);
    dispatch(signup(data))
      .then((response) => {
        setLoading(false);
        if (response.error) {
          reset();
        } else {
          alert('Sign up succesful! Please log in on the next page.')
          navigate('/login');
          reset();
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });;
  }


  return (
    <div className="pt-5">
      <Card className="col-3 offset-5 text-center">
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>
          {errorMessage.message && <SignupAlert message="Account already exists." />}
          <Form onSubmit={handleSubmit(handleFormSubmit)}> 
            <FloatingLabel controlId="formBasicEmail" className="mb-3" label={
              <span>
                <span className="red-required">* </span>
                Email Address
              </span>
            }>
              <Form.Control type="email" placeholder="Enter Email" {...register("email")} required />
            </FloatingLabel>

            <FloatingLabel controlId="formBasicPassword" className="mb-3" label={
              <span>
                <span className="red-required">* </span>
                Password
              </span>
            }>
              <Form.Control type="password" placeholder="Password" {...register("password")} required />
            </FloatingLabel>

            <FloatingLabel controlId="formBasicOrganization" className="mb-3" label={
              <span>
                <span className="red-required">* </span>
                Organization
              </span>
            }>
              <Form.Control type="text" placeholder="Organization" {...register("organization")} required />
            </FloatingLabel>

            {loading ? (
                <Button variant="secondary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status"/>
                <span>{' '}Loading...</span>
              </Button>
              ) : (
                <Button variant="primary" type="submit">Sign Up</Button>
              )}
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  )
}

export default SignUpForm