import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const BoardView = () => {
  const [isEditingBoardTitle, setIsEditingBoardTitle] = useState(false);
  const [isEditingColumnTitle, setIsEditingColumnTitle] = useState(false);
  const [editingColumnIndex, setEditingColumnIndex] = useState(null);
  const [boardTitle, setBoardTitle] = useState('Board Title');
  const [columns, setColumns] = useState([
    {
      title: 'Column 1',
      cards: ['Card 1', 'Card 2']
    },
    {
      title: 'Column 2',
      cards: ['Card 3', 'Card 4']
    },
    {
      title: 'Column 3',
      cards: ['Card 5']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleBoardTitleChange = (event) => {
    setBoardTitle(event.target.value);
  };

  const handleColumnTitleChange = (event, columnIndex) => {
    const newColumns = [...columns];
    newColumns[columnIndex].title = event.target.value;
    setColumns(newColumns);
  };

  const handleAddColumn = () => {
    setColumns([...columns, { title: `Column ${columns.length + 1}`, cards: [] }]);
  };

  const handleAddCard = (columnIndex) => {
    const newColumns = [...columns];
    newColumns[columnIndex].cards.push(`Card ${newColumns[columnIndex].cards.length + 1}`);
    setColumns(newColumns);
  };

  const handleColumnTitleClick = (columnIndex) => {
    setIsEditingColumnTitle(true);
    setEditingColumnIndex(columnIndex);
  };

  const handleColumnTitleBlur = () => {
    setIsEditingColumnTitle(false);
    setEditingColumnIndex(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Container className="board-view">
      <h2 className="board-title" onClick={() => setIsEditingBoardTitle(true)}>
        {isEditingBoardTitle ? (
          <input type="text" value={boardTitle} onChange={handleBoardTitleChange} onBlur={() => setIsEditingBoardTitle(false)} />
        ) : (
          boardTitle
        )}
      </h2>
      <hr className="board-divider" />
      <Row className="card-row flex-nowrap overflow-auto" style={{ height: 'calc(100vh - 120px)' }}>
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
                  setShowModal(true);
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
      </Row>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Card detail view goes here</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
  
};

export default BoardView;