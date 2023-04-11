import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";



const RenderColumns = () => {
  const columns = useSelector((state) => state.columns);
  console.log(columns);

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
            {column.cards.map((card, cardIndex) => (
              <Card className="card" key={cardIndex}>
                <Button variant="link" className="card-title-button" onClick={() => {
                  setModalText(card);
                  dispatch(setModalOpen());
                }}>
                  {card}
                </Button>
              </Card>
            ))}
          </Col>
        ))}
        <Col className="add-list-column" xs={4} md={3}>
          <Button variant="primary" className="add-list-button" onClick={handleAddColumn}>+ Add New List</Button>
        </Col>
      </>
  )
}

export default RenderColumns