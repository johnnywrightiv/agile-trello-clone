
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import OrgUsers from "./OrgUsers";
import LoginSignOut from "./LoginSignOut";
import SignUp from "./SignUp";

const NavBar = () => {

  return (
    <Navbar bg="secondary" variant="dark" expand="md" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Tre-Hello</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <OrgUsers />
            <SignUp />
            <LoginSignOut />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
