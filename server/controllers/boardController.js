const Board = require('./../models/boardModel');

exports.createBoard = async (req, res) => {
  const { title } = req.body;

  const newBoard = await Board.create({
    title: title,
  })

  return res.status(201).json({
    board: newBoard,
  })
};

exports.getAllBoards = async (req, res) => {
  const boards = await Board.find();

  return res.status(200).json({boards});
}

exports.getOneBoard = async (req, res) => {
  const { _id } = req.params._id;
  const board = await Board.find({_id: _id});
  return res.status(200).json({board});
}