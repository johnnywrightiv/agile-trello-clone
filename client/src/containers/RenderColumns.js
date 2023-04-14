import { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CreateCardButton from "../components/CreateCardButton";
import CreateColumnButton from "../components/CreateColumnButton";
import { fetchColumnsAction, updateColumnTitleAction } from "../features/columnsSlice";
import RenderCards from "./RenderCards";


// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = (boardId) => {
  const [ isEditingColumnTitle, setIsEditingColumnTitle ] = useState(false);
  const [ editingColumnIndex, setEditingColumnIndex ] = useState(null);
  // const [ columnTitle, setColumnTitle ] = useState();
  const { register, handleSubmit, reset } = useForm();
  const columns = useSelector((state) => state.boardColumns.columns);

  const dispatch = useDispatch();


  const handleFormSubmit = async (data) => {
    const columnId = columns[editingColumnIndex]._id;
    const newTitle = data.title;
    const requestBody = {
      id: columnId,
      title: newTitle
    }
    const board = boardId.boardId
    await dispatch(updateColumnTitleAction(requestBody));
    await dispatch(fetchColumnsAction(board));
    setIsEditingColumnTitle(false);
    reset();
  }

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
                <Form onBlur={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3" type="text" placeholder={column.title} {...register("title")} />
                </Form>

                // <input type="text" value={column.title} onChange={(event) => handleColumnTitleChange(event, columnIndex)} onBlur={handleColumnTitleBlur} />
              ) : (
                <Card.Title onClick={() => handleColumnTitleClick(columnIndex)}>
                  {column.title}
                </Card.Title>
              )}
            </Card.Header>
            <RenderCards index={columnIndex} id={column._id}/>  
            <Card.Footer>
              <CreateCardButton columnIndex={columnIndex}/> 
            </Card.Footer>
          </Card>
        ))}
        <Col className="add-column" xs={4} md={3}>
          <CreateColumnButton />
        </Col>
      </>
  )
}

export default RenderColumns