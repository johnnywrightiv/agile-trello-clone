const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const columnController = require('../controllers/columnController');

const router = express.Router();

router
  .route('/')
  .get(checkAuth, columnController.getAllColumns)
  .post(checkAuth,columnController.createColumn);

router
  .route('/:columnId')
  .get(checkAuth, columnController.getOneColumn)
  .patch(checkAuth, columnController.changeColumnTitle)
  .delete(checkAuth, columnController.deleteOneColumn);

  module.exports = router;