
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import OrgUsers from "./OrgUsers";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import UserLogout from "../components/UserLogout";
import { useSelector } from "react-redux";
import logoImage from "../files/check.png";

const NavBar = () => {
  const userIsLoggedIn = useSelector((state) => state.userAuth.isLoggedIn)
  const userEmail = useSelector((state) => state.userAuth.user)

  const renderLinks = () => {
    if (userIsLoggedIn) {
      return (
        <>
          <OrgUsers />
          <Dropdown>
            <Dropdown.Toggle className="nav-dropdowns" variant="light" id="dropdown-logout">
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
    <Navbar bg="light" variant="dark" expand="md" fixed="top">
      <Container fluid>
      <Navbar.Brand href="/">
        <img
          src={logoImage}
          alt="Logo"
          width="35"
          height="35  "
          className="d-inline-block"
          style={{
            border: "none",
            boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.7)",
            borderRadius: "10px",
            marginRight: "10px"
          }}
        />
        <span className="navbar-text">Tre-Hello</span>
      </Navbar.Brand>
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
