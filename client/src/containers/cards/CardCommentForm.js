import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";


const CardCommentForm = () => {
  const [ showCommentInput, setShowCommentInput ] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleClick = () => {
    setShowCommentInput(true);
  }
  const handleFormSubmit = () => {
    console.log('submit');
    setShowCommentInput(false);
    reset();
  }
  return (
    <>
      {showCommentInput ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3 col-4" type="text" placeholder="Enter New Comment" required {...register("title", {required: true})} />
                </Form> : 
      <Button className="board-title" onClick={handleClick}>
        + Comment
      </Button>}
    </>
  )
};

export default CardCommentForm;