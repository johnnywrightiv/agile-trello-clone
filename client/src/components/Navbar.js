
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import OrgUsers from "../containers/OrgUsers";
import Login from "../containers/LoginSignOut";
import SignUp from "./SignUp";
import UserLogout from "./UserLogout";
import { useSelector } from "react-redux";

const NavBar = () => {
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn)
  const userEmail = useSelector((state) => state.userAuth.user)
  console.log(userIsLoggedIn);
  console.log(userEmail);

  const renderLinks = () => {
    if (userIsLoggedIn) {
      return (
        <>
          <OrgUsers />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-logout">
              {userEmail}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <UserLogout />
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <>
          <SignUp />
          <Login />
        </>
      )
    }
  };

  return (
    <Navbar bg="secondary" variant="dark" expand="md" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Tre-Hello</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {renderLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
