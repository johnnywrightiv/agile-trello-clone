import { Card } from "react-bootstrap";
import { useSelector } from "react-redux"
import { useDrag } from 'react-dnd'
import DeleteCard from "../components/DeleteCard";
import { ItemTypes } from "../components/ItemTypes";
import CardDetailButton from "./CardDetailButton";


const RenderCards = (columnIndex) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const columns = useSelector((state) => state.boardColumns.columns);
  // columnIndex from props
  const index = columnIndex.columnIndex;
  // array of cards from the store
  const cards = columns[index].cardInfo;

  // logic to render cards
  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Card className="card mb-3" key={cardIndex} ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}>
          <Card.Header className="hstack card-title">
            <Card.Title>{card.title}</Card.Title>
            <CardDetailButton cardIndex={cardIndex} />
          </Card.Header>
          <Card.Body>
            {card.text}
          </Card.Body>
          <DeleteCard cardIndex={cardIndex}/>
        </Card>
      ))} </>: <div></div>}
    </>
  )
}

export default RenderCards;