import { Card } from "react-bootstrap";
import { useSelector } from "react-redux"
import { Draggable } from 'react-beautiful-dnd';
import DeleteCard from "./DeleteCard";
import CardDetailButton from "./CardDetailButton";
import { useEffect } from "react";


const RenderCards = (columnIndex) => {

  const board = useSelector((state) => state.boardById.board);
  const columns = board.columnInfo;
  // columnIndex from props
  const index = columnIndex.columnIndex;
  // array of cards from the store
  const cards = columns[index].cardInfo;


  useEffect(() => {

  }, [columns])

  const renderSelectedLabels = (cardLabels) => {
    if (cardLabels && cardLabels.length > 0) {
      return (
        <div className="d-flex flex-wrap">
          {cardLabels.map((label, index) => (
            <span 
              className="card-label-tag" 
              key={index} 
              style={{ backgroundColor: label.labelColor, marginRight: "5px" }} 
            ></span>                    
          ))}
        </div>
      )
    } else {
      return (
        <div className="d-flex flex-wrap">
          <span 
            className="card-label-tag" 
            style={{ visibility: "hidden" }} 
          ></span>
        </div>
      )
    }
  }
  
  
  // logic to render cards
  return (
    <>
      { cards ? <> {cards.map((card, cardIndex) => (
        <Draggable draggableId={card._id} index={cardIndex} key={card._id}>
          {(provided) => (
            <div 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
            <Card className="card mb-3">
              {renderSelectedLabels(card.labels)}
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
      ))} </>: <div></div> }
    </>
  )
}

export default RenderCards;