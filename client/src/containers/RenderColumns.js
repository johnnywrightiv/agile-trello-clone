import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CreateCardButton from "../components/CreateCardButton";
import CreateColumnButton from "../components/CreateColumnButton";
import { fetchCardsAction } from "../features/cardsSlice";
import RenderCards from "./RenderCards";



const RenderColumns = () => {
  const [ isEditingColumnTitle, setIsEditingColumnTitle ] = useState(false);
  const [ editingColumnIndex, setEditingColumnIndex ] = useState(null);
  const [ columnTitle, setColumnTitle ] = useState();
  const columns = useSelector((state) => state.boardColumns.columns);

  const dispatch = useDispatch();

  const handleColumnTitleChange = (event, columnIndex) => {
    setColumnTitle(event.target.value);
    console.log(columnTitle);
  };

  const handleColumnTitleBlur = () => {
    setIsEditingColumnTitle(false);
    setEditingColumnIndex(null);
  };

  const handleColumnTitleClick = (columnIndex) => {
    setIsEditingColumnTitle(true);
    setEditingColumnIndex(columnIndex);
    // setColumnTitle(columns[columnIndex].title);
  };

  return (
      <>
        {columns.map((column, columnIndex) => (
          <Card className="card-column m-2" key={columnIndex}>
            <Card.Header className="d-flex justify-content-between align-items-center mb-2 column-header">
              {isEditingColumnTitle && editingColumnIndex === columnIndex ? (
                <input type="text" value={column.title} onChange={(event) => handleColumnTitleChange(event, columnIndex)} onBlur={handleColumnTitleBlur} />
              ) : (
                <h3 className="column-title" onClick={() => handleColumnTitleClick(columnIndex)}>
                  {column.title}
                </h3>
              )}
              <CreateCardButton columnIndex={columnIndex}/>
            </Card.Header>
            <RenderCards index={columnIndex} id={column._id}/>  
          </Card>
        ))}
        <Col className="add-column" xs={4} md={3}>
          <CreateColumnButton />
        </Col>
      </>
  )
}

export default RenderColumns