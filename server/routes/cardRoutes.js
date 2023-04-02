const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const cardController = require('./../controllers/cardController');

const router = express.Router();

router
  .route('/')
  .get(checkAuth, cardController.getAllCards)
  .post(checkAuth, cardController.createCard);

router
  .route('/card/:cardId')
  .patch(checkAuth, cardController.editCardTitle);

router
  .route('/reorder/same-column')
  .post(checkAuth, cardController.reorderSameColumn);

router
  .route('/reorder/different-column')
  .post(checkAuth, cardController.reorderDifferentColumn);

  

  module.exports = router;