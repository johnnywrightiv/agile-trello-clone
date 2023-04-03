import { Navbar, Nav, Container, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';


const NavBar = () => {
  // component that renders navbar

  return (
  <Navbar bg="secondary" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand>Ch-ello</Navbar.Brand>
    </Container>
  </Navbar>
  )
};

export default NavBar;