import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { setModalOpen } from "../features/modalOpenSlice";



const RenderCards = () => {
  const cards = useSelector((state) => state.cards);
  console.log(cards)

  const dispatch = useDispatch();

  return (
    <>
    {/* {cards.map((card, cardIndex) => (
      <Card className="card" key={cardIndex}>
        <Button variant="link" className="card-title-button" onClick={() => {
          // setModalText(card);
          dispatch(setModalOpen());
        }}>
          {card}
        </Button>
      </Card>
    ))} */}
    </>
  )
}

export default RenderCards;