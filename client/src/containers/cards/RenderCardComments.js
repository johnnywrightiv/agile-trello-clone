import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardCommentForm from "./CardCommentForm";

const RenderCardComments = () => {
  const userAuth = useSelector(state => state.userAuth);
  

  return (
    <>
    <Modal.Title> Comments & Activity </Modal.Title>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span className='user-circle'>{userAuth.user[0].toUpperCase()}</span> 
      <Modal.Body>a comment or activity log item</Modal.Body>
    </div>
    <CardCommentForm />
    </>
  )
}

export default RenderCardComments;