import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardByIdAction, updateBoardTitleAction } from "../../features/boardByIdSlice";



const BoardTitleChange = () => {
  const boardData = useSelector((state) => state.boardById.board);

  // local state
  const [ boardTitle, setBoardTitle ] = useState(boardData.title)
  const [ isEditingBoardTitle, setIsEditingBoardTitle ] = useState(false);


  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setBoardTitle(boardData.title);
  }, [boardData]);

  // function that alters isEditingBoardTitle state to true - causes input box to appear for user to edit the title of the board
  const handleBoardTitleClick = () => {
    setIsEditingBoardTitle(true);
  }

  // function that closes the edit box and dipatches the PATCH function to update the title of the board.  It also fetches the boardById in order to update the redux store with the new information.
  const handleFormSubmit = async (data) => {
    const newBoardTitle = data.title;
    const boardId = boardData._id;
    const bodyRequest = {
      id: boardId,
      title: newBoardTitle
    }
    await dispatch(updateBoardTitleAction(bodyRequest));
    await dispatch(fetchBoardByIdAction(boardId));
    setBoardTitle(newBoardTitle);
    setIsEditingBoardTitle(false);
    reset();
  }

   return (
    <>
      {isEditingBoardTitle ? <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Form.Control className="mb-3 col-4" type="text" placeholder="Enter New Board Name" required {...register("title", {required: true})} />
                </Form> : 
      <h2 className="board-title" onClick={handleBoardTitleClick}>
        {boardTitle}
      </h2>}
    </>
   )
}

export default BoardTitleChange;