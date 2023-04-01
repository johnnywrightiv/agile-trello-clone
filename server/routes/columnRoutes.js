const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const columnController = require('../controllers/columnController');

const router = express.Router();

router
  .route('/all/:boardId')
  .get(checkAuth, columnController.getAllColumns);

  router
  .route('/column/:columnId')
  .get(checkAuth, columnController.getOneColumn);
  
  router
  .route('/')
  .post(checkAuth,columnController.createColumn);

  module.exports = router;