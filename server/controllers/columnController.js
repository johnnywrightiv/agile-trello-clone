const Board = require('./../models/boardModel');
const Column = require('./../models/columnModel');
const Card = require('./../models/cardModel');


// GET - get all columns of a specific board
exports.getAllColumns = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { sort } = req.query;
    const sortColumns = {}

    if (sort) {
      if (sort === 'newest') {
        sortColumns.createdAt = 'desc'
      } else if (sort === 'oldest') {
        sortColumns.createdAt = 'asc';
      } else if (sort === 'alphabetically') {
        sortColumns.title = 'asc';
      } else if (sort === 'reverse-alphabetically') {
        sortColumns.title = 'desc';
      }
    }

    const board = await Board.findOne({ _id: boardId })

    if (!board) {
      return res
        .status(404)
        .json({ message: 'Board with given id was not found' });
    }

    const columns = await Column.find({ boardId: boardId }).sort(sortColumns)
    
    return res
      .status(200)
      .json({ columns: columns, board: board });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// GET - get one column by id
exports.getOneColumn = async (req, res) => {
  try {
    const { columnId } = req.params;

    const column = await Column.findOne({ _id: columnId });
    const cards = await Card.find({columnId: columnId})

    if (!column) {
      return res
        .status(404)
        .json({ message: 'Column with given id was not found' });
    } else {
      return res.status(200).json({ column: column, cards: cards });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST - create a new column
exports.createColumn = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    const newColumn = new Column({
      boardId: boardId,
      title,
      cardOrder: [],
    });

    const columnResult = await newColumn.save();
    const board = await Board.findById(boardId)

    if (!board) {
      res.status(404).json({ message: 'Board with provided id does not exist' });
    } else {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.push(columnResult._id);
      board.set({ columnOrder: newColumnOrder });
      const boardResult = await board.save();

      return res.status(201).json({
        newColumn: columnResult,
        board: boardResult,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// PATCH - change column title
exports.changeColumnTitle = async (req, res) => {
  try {
    const { columnId } = req.params;

    const updatedColumn = await Column.findOneAndUpdate({ _id: columnId }, { title: req.body.title }, { new: true })

    if (!updatedColumn) {
      return res
        .status(404)
        .json({ message: 'Column with given id was not found' });
    } else {
      return res.status(200).json({ updatedColumn: updatedColumn });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// DELETE - delete one card by id
exports.deleteOneColumn = async (req, res) => {
  try {
    const { columnId, boardId } = req.params;

    const column = await Column.findOneAndDelete({ _id: columnId });
    const cards = await Card.deleteMany({ columnId: columnId });
    const board = await Board.findOne({_id: boardId});
    board.set({columnOrder: board.columnOrder.filter((column) => {
      return column !== columnId;
    })});

    const updatedColumns = await Column.find({boardId: boardId});
    
    const updatedBoard = await board.save()
    
    if (!column) {
      return res
        .status(404)
        .json({ message: 'Column with given id was not found' });
    } else {
      

      return res.status(200).json({ message: "Column deleted", updatedBoard: updatedBoard, updatedColumns: updatedColumns });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};