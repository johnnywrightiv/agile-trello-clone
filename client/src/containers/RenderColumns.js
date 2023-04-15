import { useState, createContext } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CreateCardButton from "../components/CreateCardButton";
import CreateColumnButton from "../components/CreateColumnButton";
import { fetchColumnsAction, updateColumnTitleAction } from "../features/columnsSlice";
import RenderCards from "./RenderCards";

export const ColumnIndexContext = createContext();

// Renders in BoardView the id of the board is passed down as a prop
const RenderColumns = (boardId) => {
  const [ isEditingColumnTitle, setIsEditingColumnTitle ] = useState(false);
  const [ editingColumnIndex, setEditingColumnIndex ] = useState(0);
  // const [ columnTitle, setColumnTitle ] = useState();
  const columns = useSelector((state) => state.boardColumns.columns);
  const { register, handleSubmit, reset } = useForm();


  const dispatch = useDispatch();


  const handleFormSubmit = async (data) => {
      const columnId = columns[editingColumnIndex]._id;
      const newTitle = data.title;
      const requestBody = {
        id: columnId,
        title: newTitle
      }

      // Board Id from props to sent to fetchColumnsAction
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
        <ColumnIndexContext.Provider value={columnIndex} key={columnIndex}>
          <Card className="card-column m-2">
            <Card.Header className="d-flex justify-content-between align-items-center mb-2 column-header">
              {isEditingColumnTitle && editingColumnIndex === columnIndex ? (
                <Form onBlur={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3" type="text" placeholder="Enter New Name" 
                    {...register("title", {required: true})} />
                </Form>
              ) : (
                <Card.Title onClick={() => handleColumnTitleClick(columnIndex)}>
                  {column.title}
                </Card.Title>
              )}
            </Card.Header>
            <RenderCards columnIndex={columnIndex} />  
            <Card.Footer>
              <CreateCardButton columnIndex={columnIndex}/> 
            </Card.Footer>
          </Card>
        </ColumnIndexContext.Provider>
        ))}
        <Col className="add-column" xs={4} md={3}>
          <CreateColumnButton />
        </Col>
      </>
  )
}

export default RenderColumns