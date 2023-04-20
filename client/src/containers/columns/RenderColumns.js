import { createContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import CreateCardButton from "../../components/CreateCardButton";
import CreateColumnButton from "../../components/CreateColumnButton";
import ColumnTitleChange from "./ColumnTitleChange";
import RenderCards from "../cards/RenderCards";

export const ColumnIndexContext = createContext();

// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = () => {
  
  const board = useSelector((state) => state.boardById.board);
  const columns = board.columnInfo;

  const columnRender = () => {
    return (
      <>
        {columns.map((column, columnIndex) => (
          <ColumnIndexContext.Provider value={columnIndex} key={column._id}>
            <Draggable draggableId={column._id} index={columnIndex}>
              {(provided) => (
                <Card 
                  className="card-column m-2"
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <Card.Header {...provided.dragHandleProps} className="d-flex justify-content-between align-items-center mb-2 column-header">
                    <ColumnTitleChange columnIndex={columnIndex} columnTitle={column.title} />
                  </Card.Header>
                  <Droppable droppableId={column._id} type="card">
                    {(provided) => (
                      <Card.Body
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                      >
                        <RenderCards columnIndex={columnIndex}/>
                        {provided.placeholder}
                      </Card.Body>
                    )}
                  </Droppable> 
                  <Card.Footer>
                    <CreateCardButton columnIndex={columnIndex}/> 
                  </Card.Footer>
                </Card>
              )}
            </Draggable>
          </ColumnIndexContext.Provider>
          )
        )}
      </>
    )
  }

  return (
      <>
        <Droppable 
          droppableId='columns' 
          direction='horizontal' 
          type='column'
        >
          {(provided) => (
            <Row 
              className="column-row flex-nowrap overflow-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnRender()}
              {provided.placeholder}
              <CreateColumnButton />
            </Row>
          )}
        </Droppable>
      </>
  )
}

export default RenderColumns