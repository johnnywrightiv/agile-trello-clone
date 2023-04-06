
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import OrgUsers from "../containers/OrgUsers";
import Login from "../containers/LoginSignOut";
import SignUp from "./SignUp";
import UserLogout from "./UserLogout";

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
            <Login />
            <UserLogout />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
