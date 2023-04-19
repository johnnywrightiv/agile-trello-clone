import { useEffect, useState } from "react";
import { Form, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCardTextAction } from "../../features/cardDetailSlice";


const CardTextChange = () => {
  const cardData = useSelector((state) => state.cardById.card);

  // local state
  const [ cardText, setCardText ] = useState(cardData.text)
  const [ isEditingCardText, setIsEditingCardText ] = useState(false);


  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setCardText(cardData.text);
  }, [cardData]);

  // function that alters isEditingCardText state to true - causes input box to appear for user to edit the Text of the card
  const handleCardTextClick = () => {
    setIsEditingCardText(true);
  }

  // function that closes the edit box and dipatches the PATCH function to update the text of the card.  It also fetches the cardById in order to update the redux store with the new information.
  const handleFormSubmit = async (data) => {
    const newCardText = data.text;
    const cardId = cardData._id;
    const bodyRequest = {
      id: cardId,
      text: newCardText
    }
    await dispatch(updateCardTextAction(bodyRequest));
    setCardText(newCardText);
    setIsEditingCardText(false);
    reset();
  }

   return (
    <>
      {isEditingCardText ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3 col-4" type="text" placeholder="Enter New Card Description" required {...register("text", {required: true})} />
                </Form> : 
      <Card.Body className="card-text" onClick={handleCardTextClick}>
        {cardText}
      </Card.Body>}
    </>
   )
}

export default CardTextChange;