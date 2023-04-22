import { Container } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"


const LoadingSpinner = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Spinner 
        animation="border" 
        role="status" 
        variant="info"
      />
    </Container>
  )
}

export default LoadingSpinner;