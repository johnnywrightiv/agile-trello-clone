import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoardByIdAction, updateBoardTitleAction } from "../features/boardByIdSlice";



const BoardTitleChange = () => {
  const boardData = useSelector((state) => state.boardById.board);

  // local state
  const [ boardTitle, setBoardTitle ] = useState(boardData.title)
  const [ isEditingBoardTitle, setIsEditingBoardTitle ] = useState(false);

  const dispatch = useDispatch();

  // function that alters isEditingBoardTitle state to true - causes input box to appear for user to edit the title of the board
  const handleBoardTitleClick = () => {
    setIsEditingBoardTitle(true);
  }

  // function that sets local state as user changes the title
  const handleBoardTitleChange = async (event) => {
    setBoardTitle(event.target.value);
  };

  // function that closes the edit box and dipatches the patch function to update the title of the board.  It also fetches the boardById in order to update the redux store with the new information.
  const handleBoardTitleBlur = async () => {
    setIsEditingBoardTitle(false);
    const bodyRequest = {
      id: boardData._id,
      title: boardTitle
    }
    await dispatch(updateBoardTitleAction(bodyRequest));
    await dispatch(fetchBoardByIdAction(boardData._id));
  }

   return (
    <>
      {isEditingBoardTitle ? <input type="text" value={boardTitle} onChange={(event) => handleBoardTitleChange(event)} onBlur={handleBoardTitleBlur} /> : 
      <h2 className="board-title" style={{"cursor": "pointer"}} onClick={handleBoardTitleClick}>
        {boardTitle}
      </h2>}
    </>
   )
}

export default BoardTitleChange;