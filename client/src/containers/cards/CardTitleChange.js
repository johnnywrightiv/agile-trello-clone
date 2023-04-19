import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateCardTitleAction } from "../../features/cardDetailSlice";



const CardTitleChange = () => {
  const cardData = useSelector((state) => state.cardById.card);

  // local state
  const [ cardTitle, setCardTitle ] = useState(cardData.title)
  const [ isEditingCardTitle, setIsEditingCardTitle ] = useState(false);


  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setCardTitle(cardData.title);
  }, [cardData]);

  // function that alters isEditingCardTitle state to true - causes input box to appear for user to edit the title of the card
  const handleCardTitleClick = () => {
    setIsEditingCardTitle(true);
  }

  // function that closes the edit box and dipatches the PATCH function to update the title of the card.  It also fetches the cardById in order to update the redux store with the new information.
  const handleFormSubmit = async (data) => {
    const newCardTitle = data.title;
    const cardId = cardData._id;
    const bodyRequest = {
      id: cardId,
      title: newCardTitle
    }
    await dispatch(updateCardTitleAction(bodyRequest));
    setCardTitle(newCardTitle);
    setIsEditingCardTitle(false);
    reset();
  }

   return (
    <>
      {isEditingCardTitle ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3 col-4" type="text" placeholder="Enter New Card Title" required {...register("title", {required: true})} />
                </Form> : 
      <Card.Title className="card-title" onClick={handleCardTitleClick}>
        {cardTitle}
      </Card.Title>}
    </>
   )
}

export default CardTitleChange;