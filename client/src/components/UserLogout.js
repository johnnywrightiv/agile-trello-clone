import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { logout } from "../features/userAuthSlice";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setModalClosed } from "../features/modalOpenSlice";


const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    await dispatch(logout());
    await dispatch(setModalClosed());
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