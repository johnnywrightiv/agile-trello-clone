const Board = require('./../models/boardModel');

// GET all users boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board
    .find({ 
      user: req.userData._id 
    })
    .select('columnOrder title _id')
  
    if (boards.length === 0) {
      const firstBoard = new Board({
         user:req.userData._id,
         title:'',
         columnOrder:[]
      });
      return res.status(200).json({ message: 'This user has not created any boards' })
    } else {
      return res.status(200).json({ boards });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// Get users board by id
exports.getOneBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findOne({ _id: id })

    if (!board) {
      return res.status(404).json({ message: 'The board with given id was not found' });
    } else {
      return res.status(200).json({ details: board })
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// create a new board
exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const newBoard = await Board.create({
      user: req.userData._id,
      title,
      columnOrder: [],
    })
    res.status(201).json({ message:'New board created', newBoard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// reorder board columns by id
exports.updateBoard = async (req, res) => {
  try {
    const { boardId, newColumnOrder } = req.body;
  if(boardId && newColumnOrder) {
    console.log(boardId,newColumnOrder);
    const board = await Board.findOneAndUpdate({
      _id:boardId
    }, 
    { 
      columnOrder: newColumnOrder
    })          
      const updatedColumnOrder = board.columnOrder;
      console.log(updatedColumnOrder);
      res.status(200).json({ 
        message: 'Reorder was successful', 
        updatedColumnOrder 
      })
    } else {
      return res.status(500).json({message: err.message});
    }
  } catch (error) {
    res.status(400).json({message:'Required parameters are missing'});
  }
}