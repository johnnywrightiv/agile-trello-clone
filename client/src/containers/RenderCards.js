import { Card } from "react-bootstrap";
import { useSelector } from "react-redux"
import { useDrag } from 'react-dnd'
import DeleteCard from "../components/DeleteCard";
import { ItemTypes } from "../components/ItemTypes";
import CardDetailButton from "../components/CardDetailButton";


const RenderCards = (columnIndex) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const columns = useSelector((state) => state.boardColumns.columns);

  const index = columnIndex.columnIndex;
  const cards = columns[index].cardInfo;


  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Card className="card mb-3" key={cardIndex} ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}>
          <Card.Header className="hstack card-title">
            <p>{card.title}</p>
            <CardDetailButton />
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