const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const columnController = require('../controllers/columnController');

const router = express.Router();

router
  .route('/')
  .post(checkAuth,columnController.createColumn)
  .delete(checkAuth,columnController.deleteOneColumn);

router
  .route('/:boardId')
  .get(checkAuth, columnController.getAllColumns);

router
  .route('/:columnId')
  .get(checkAuth, columnController.getOneColumn)
  .patch(checkAuth, columnController.changeColumnTitle)
  .delete(checkAuth, columnController.deleteOneColumn);

  module.exports = router;