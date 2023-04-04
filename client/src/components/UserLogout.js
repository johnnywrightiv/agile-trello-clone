import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { logout } from "../features/userAuthSlice";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <Nav.Item>
    <Nav.Link onClick={handleClick}>
      Logout
    </Nav.Link>
  </Nav.Item>
  )
}

export default UserLogout;