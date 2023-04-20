import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardCommentForm from "./CardCommentForm";

const RenderCardComments = () => {
  const userAuth = useSelector(state => state.userAuth);
  const cardComments = useSelector(state => state.cardComments.cardComments)
  
  const renderComments = () => {
    if (cardComments && Object.keys(cardComments).length > 0) {
      return (
        <>
          {cardComments.map(comment => (
            <div style={{ display: 'flex', alignItems: 'center' }} key={comment._id}>
            <span className='user-circle'>{comment.creator[0].toUpperCase()}</span> 
            <Modal.Body>{comment.text}</Modal.Body>
          </div>
          ))}
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <>
    <Modal.Title> Comments & Activity </Modal.Title>
      {renderComments()}
    <CardCommentForm />
    </>
  )
}

export default RenderCardComments;