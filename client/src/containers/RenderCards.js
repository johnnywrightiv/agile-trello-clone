import { useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { fetchCardsAction } from "../features/cardsSlice";
import { setModalOpen } from "../features/modalOpenSlice";



const RenderCards = ({ index, id }) => {
  const cards = useSelector((state) => state.columnCards.cards);
  // console.log(cards);
  // console.log("index: " + index + "| id: " + id);
  const [ isLoading, setIsLoading ] = useState(true);

  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(fetchCardsAction(id))
    setIsLoading(false);
  }, []);

  const mapCards = () => {
    console.log(cards);
    if (cards.length > 0) {
      return (
        <>
          {cards.map((card, cardIndex) => (
            <Card className="card" key={cardIndex}>
              <Button variant="link" className="card-title-button" onClick={() => {
                // setModalText(card);
                dispatch(setModalOpen());
              }}>
                {card}
              </Button>
            </Card>
          ))}
        </>
      )
    } else {
      return (<h2>No Cards</h2>)
    }
  }


  return (
    <>
      { isLoading ? {mapCards} : <h2>Loading</h2> }
    </>
  )
}

export default RenderCards;