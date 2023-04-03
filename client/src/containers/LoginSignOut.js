import { useState } from "react";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


const LoginSignOut = () => {
  // dummy state to represent user authentication. Changes text on login/sign out button.
  const [userAuth, setUserAuth] = useState(false);

  const handleLoginClick = () => {
    setUserAuth(!userAuth);
  };
  return (
    <Nav.Item>
    <Nav.Link onClick={handleLoginClick}>
      {userAuth ? "Sign Out" : "Login"}
    </Nav.Link>
  </Nav.Item>
  )
}

export default LoginSignOut