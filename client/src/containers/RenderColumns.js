import { createContext } from "react";
import { Card, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateCardButton from "../components/CreateCardButton";
import CreateColumnButton from "../components/CreateColumnButton";
import ColumnTitleChange from "./ColumnTitleChange";
import RenderCards from "./RenderCards";

export const ColumnIndexContext = createContext();

// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = () => {
  
  // const [ columnTitle, setColumnTitle ] = useState();
  const columns = useSelector((state) => state.boardColumns.columns);
  

  return (
      <>
        {columns.map((column, columnIndex) => (
          <ColumnIndexContext.Provider value={columnIndex} key={column._id}>
            <Card className="card-column m-2">
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
        <Col className="add-column" xs={4} md={3}>
          <CreateColumnButton />
        </Col>
      </>
  )
}

export default RenderColumns