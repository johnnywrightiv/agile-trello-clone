import { useContext, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardByIdAction } from "../../features/boardByIdSlice";
import {  updateColumnTitleAction } from "../../features/columnsSlice";




const ColumnTitleChange = ({ columnIndex, columnTitle }) => {
  // access columns for the viewed board from the redux store
  const board = useSelector((state) => state.boardById.board);
  const columns = board.columnInfo;
  // local state to control editing status
  const [ isEditingColumnTitle, setIsEditingColumnTitle ] = useState (false);
  // local state to set the index of the column being edited
  const [ editingColumnIndex, setEditingColumnIndex ] = useState(0);
  // boardId prop from BoardView
  
  
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  // logic to send request to update column title
  const handleFormSubmit = async (data) => {
    const columnId = columns[editingColumnIndex]._id;
    const newTitle = data.title;
    const requestBody = {
      id: columnId,
      title: newTitle
    }

    await dispatch(updateColumnTitleAction(requestBody));
    await dispatch(fetchBoardByIdAction(board._id));
    setIsEditingColumnTitle(false);
    reset();
};

const handleColumnTitleClick = (columnIndex) => {
  setIsEditingColumnTitle(true);
  setEditingColumnIndex(columnIndex);
};

  return (
    <>
      {isEditingColumnTitle && editingColumnIndex === columnIndex ? (
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Control className="mb-3" type="text" placeholder="Enter New Name" 
            {...register("title", {required: true})} />
        </Form>
      ) : (
        <Card.Title onClick={() => handleColumnTitleClick(columnIndex)}>
          {columnTitle}
        </Card.Title>
      )}
    </>
  )
}

export default ColumnTitleChange;