import { Button, Card, Form, FloatingLabel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../features/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const SignUpForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    dispatch(signup(data));
    navigate('/login');
    reset();
  }

  return (
    <div className="pt-5">
      <Card className="col-3 offset-5 text-center">
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>
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

            <Button variant="primary" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  )
}

export default SignUpForm