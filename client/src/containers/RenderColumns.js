import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import RenderCards from "./RenderCards";



const RenderColumns = () => {
  const [isEditingColumnTitle, setIsEditingColumnTitle] = useState(false);
  const [editingColumnIndex, setEditingColumnIndex] = useState(null);
  const columns = useSelector((state) => state.boardColumns.columns);
  console.log(columns);


  const handleColumnTitleChange = (event, columnIndex) => {
    // const newColumns = [...columns];
    // newColumns[columnIndex].title = event.target.value;
    // setColumns(newColumns);
  };

  const handleColumnTitleBlur = () => {
    setIsEditingColumnTitle(false);
    setEditingColumnIndex(null);
  };

  const handleColumnTitleClick = (columnIndex) => {
    setIsEditingColumnTitle(true);
    setEditingColumnIndex(columnIndex);
  };

  const handleAddCard = (columnIndex) => {
    // const newColumns = [...columns];
    // newColumns[columnIndex].cards.push(`Card ${newColumns[columnIndex].cards.length + 1}`);
    // setColumns(newColumns);
  };

  const handleAddColumn = () => {
    // setColumns([...columns, { title: `Column ${columns.length + 1}`, cards: [] }]);
  };


  return (
      <>
        {columns.map((column, columnIndex) => (
          <Col className="card-column m-2" xs={4} md={3} key={columnIndex}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              {isEditingColumnTitle && editingColumnIndex === columnIndex ? (
                <input type="text" value={column.title} onChange={(event) => handleColumnTitleChange(event, columnIndex)} onBlur={handleColumnTitleBlur} style={{ width: '50%' }}/>
              ) : (
                <h3 className="column-title" onClick={() => handleColumnTitleClick(columnIndex)}>
                  {column.title}
                </h3>
              )}
              <Button variant="light" size="sm" onClick={() => handleAddCard(columnIndex)}>+ Add New Card</Button>
            </div>
            <RenderCards />  
          </Col>
        ))}
        <Col className="add-column" xs={4} md={3}>
          <Button variant="primary" className="add-column-button" onClick={handleAddColumn}>+ Add New Column</Button>
        </Col>
      </>
  )
}

export default RenderColumns