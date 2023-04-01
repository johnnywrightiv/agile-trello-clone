import { useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = () => {

  // dummy state to represent user authentication. Changes text on login/sign out button.
  const [userAuth, setUserAuth] = useState(false);

  // dummy array of users
  const members = ["Johnny", "Nils", "Michael"];

  const handleLoginClick = () => {
    setUserAuth(!userAuth);
  };

  return (
    <Container fluid>
      <Navbar bg="secondary" variant="dark" expand="md" fixed="top">
        <Navbar.Brand href="/">Tre-Hello</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-members">
                Members ({members.length})
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {members.map((member, index) => (
                  <Dropdown.Item key={index}>{member}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link onClick={handleLoginClick}>
                {userAuth ? "Sign Out" : "Login"}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
