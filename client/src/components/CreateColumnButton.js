import { Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../features/modalOpenSlice";
import CreateColumnModal from "../containers/columns/CreateColumnModal";

const CreateColumnButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setModalOpen());
  }

  return (
    <Col sm={4}>
      <Button onClick={handleClick}>+ Add New Column</Button>
      <CreateColumnModal />
    </Col>
)}

export default CreateColumnButton;