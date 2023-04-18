import { Card } from "react-bootstrap";
import { useSelector } from "react-redux"
import { Draggable } from 'react-beautiful-dnd';
import DeleteCard from "./DeleteCard";
import CardDetailButton from "./CardDetailButton";


const RenderCards = (columnIndex) => {


  const columns = useSelector((state) => state.boardColumns.columns);
  // columnIndex from props
  const index = columnIndex.columnIndex;
  // array of cards from the store
  const cards = columns[index].cardInfo;

  // logic to render cards
  return (
    <>
      { cards ? <>{cards.map((card, cardIndex) => (
        <Draggable draggableId={card._id} columnIndex={columnIndex} index={cardIndex} key={card._id}>
          {(provided) => (
            <div 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
            <Card className="card mb-3">
            <Card.Header className="hstack card-title">
              <Card.Title>{card.title}</Card.Title>
              <CardDetailButton cardIndex={cardIndex} />
            </Card.Header>
            <Card.Body>
              {card.text}
            </Card.Body>
            <DeleteCard cardIndex={cardIndex}/>
          </Card>
          </div>
          )}
        </Draggable>
      ))} </>: <div></div>}
    </>
  )
}

export default RenderCards;