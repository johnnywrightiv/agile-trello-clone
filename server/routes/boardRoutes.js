const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const boardController = require('../controllers/boardController');

const router = express.Router();

router
  .route('/')
  .get(checkAuth, boardController.getAllBoards)
  .post(checkAuth,boardController.createBoard);

router
  .route('/:id')
  .get(checkAuth, boardController.getOneBoard)

  module.exports = router;