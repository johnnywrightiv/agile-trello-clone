import { createContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Droppable } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import CreateCardButton from "../../components/CreateCardButton";
import CreateColumnButton from "../../components/CreateColumnButton";
import ColumnTitleChange from "./ColumnTitleChange";
import RenderCards from "../cards/RenderCards";

export const ColumnIndexContext = createContext();

// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = () => {
  
  // const [ columnTitle, setColumnTitle ] = useState();
  const columns = useSelector((state) => state.boardColumns.columns);

  const columnRender = () => {
    return (
      <>
        {columns.map((column, columnIndex) => (
          <ColumnIndexContext.Provider value={columnIndex} key={column._id}>
            <Card className="card-column m-2">
              <Card.Header className="d-flex justify-content-between align-items-center mb-2 column-header">
                <ColumnTitleChange columnIndex={columnIndex} columnTitle={column.title} />
              </Card.Header>
              <Droppable droppableId={column._id}>
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
          </ColumnIndexContext.Provider>
          )
        )}
      </>
    )
  }
  return (
      <>
        <Row className="column-row flex-nowrap overflow-auto" >
          {columnRender()}
          <CreateColumnButton />
        </Row>
      </>
  )
}

export default RenderColumns