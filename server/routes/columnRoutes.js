const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const columnController = require('../controllers/columnController');

const router = express.Router();

router
  .route('/')
  .post(checkAuth,columnController.createColumn);

router
  .route('/:boardId')
  .get(checkAuth, columnController.getAllColumns);

router
  .route('/:columnId')
  .post(checkAuth, columnController.changeColumnTitle);

router
  .route('/column/:columnId')
  .get(checkAuth, columnController.getOneColumn);

  module.exports = router;