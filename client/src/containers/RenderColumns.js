import { createContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import CreateCardButton from "../components/CreateCardButton";
import CreateColumnButton from "../components/CreateColumnButton";
import { ItemTypes } from "../components/ItemTypes";
import ColumnTitleChange from "./ColumnTitleChange";
import RenderCards from "./RenderCards";

export const ColumnIndexContext = createContext();

// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = () => {
  
  // const [ columnTitle, setColumnTitle ] = useState();
  const columns = useSelector((state) => state.boardColumns.columns);
  
  // Drag Funcitonality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const columnRender = () => {
    return (
      <>
        {columns.map((column, columnIndex) => (
          <ColumnIndexContext.Provider value={columnIndex} key={column._id}>
            <Card className="card-column m-2" ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}>
              <Card.Header className="d-flex justify-content-between align-items-center mb-2 column-header">
                <ColumnTitleChange columnIndex={columnIndex} columnTitle={column.title} />
              </Card.Header>
              <RenderCards columnIndex={columnIndex} />  
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
        </Row>
        <Col className="add-column" xs={4} md={3}>
          <CreateColumnButton />
        </Col>
      </>
  )
}

export default RenderColumns