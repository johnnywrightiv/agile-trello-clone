import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCardCommentAction, fetchCardCommentsAction } from "../../features/cardCommentsSlice";


const CardCommentForm = () => {
  const cardId = useSelector(state => state.columnAndCardInfo.cardId)
  const [ showCommentInput, setShowCommentInput ] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const handleClick = () => {
    setShowCommentInput(true);
  }
  const handleFormSubmit = async (data) => {
    const requestBody = {
      text: data.text,
      cardId: cardId
    }
    console.log(requestBody)
    await dispatch(addCardCommentAction(requestBody));
    await dispatch(fetchCardCommentsAction(cardId));
    setShowCommentInput(false);
    reset();
  }
  return (
    <>
      {showCommentInput ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3 col-4" type="text" placeholder="Enter New Comment" required {...register("text", {required: true})} />
                </Form> : 
      <Button className="board-title" onClick={handleClick}>
        + Comment
      </Button>}
    </>
  )
};

export default CardCommentForm;