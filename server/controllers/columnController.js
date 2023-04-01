const Column = require('./../models/columnModel');
const Board = require('./../models/boardModel');

// GET - get all columns of a specific board
exports.getAllColumns = async (req, res) => {
  try {
    const { boardId } = req.params;
    console.log(boardId);
    console.log(req.params)

    const board = await Board.findOne({ _id: boardId })
      .select('columnOrder')
      .exec();
    if (!board) {
      return res
        .status(404)
        .json({ message: 'Board with given id was not found' });
    }
    const columns = await Column.find({ board: boardId })
      .select('cardIds title columnId')
      .exec();
    return res
      .status(200)
      .json({ columns: columns, board: board });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// GET - get column by id
exports.getOneColumn = async (req, res) => {
  try {
    const columnId = req.params;
    const column = await Column.findOne({ _id: columnId });

    if (!column) {
      return res
        .status(404)
        .json({ message: 'Column with given id was not found' });
    } else {
      return res.status(200).json({ column: column });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST - create a new column
exports.createColumn = async (req, res) => {
  try {
    const { title, boardId, columnId } = req.body;
    await Column.find().exec();
    const newColumn = new Column({
      board: boardId,
      title,
      cardIds: [],
      columnId,
    });

    const columnResult = await newColumn.save();
    const board = await Board.findById(boardId).exec();

    if (!board) {
      res.status(404).json({ message: 'No Board exists of provided id' });
    } else {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.push(columnResult.columnId);
      board.set({ columnOrder: newColumnOrder });
      const boardResult = await board.save();

      return res.status(201).json({
        // message: 'New Column Added and also updated columnOrder in board',
        column: columnResult,
        board: boardResult,
      });
    }
  } catch (err) {
       return res.status(500).json({ message: err.message });
  }
}

// Post 