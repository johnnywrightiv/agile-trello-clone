const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const boardController = require('../controllers/boardController');

const router = express.Router();

router
  .route('/')
  .get(checkAuth, boardController.getAllBoards)
  .post(checkAuth,boardController.createBoard)

router
  .route('/:boardId')
  .get(checkAuth, boardController.getOneBoard);

  router
  .route('/:boardId')
  .delete(checkAuth, boardController.deleteOneBoard);

router
  .route('/title/:boardId')
  .patch(checkAuth, boardController.updateTitle);

router
  .route('/collection/:boardId')
  .patch(checkAuth, boardController.updateCollection);

router
  .route('/column-reorder/:boardId')
  .patch(checkAuth, boardController.updateColumnOrder);

  module.exports = router;