const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const cardController = require('./../controllers/cardController');

const router = express.Router();

router
  .route('/')
  .post(checkAuth, cardController.createCard);

router
  .route('/all/:columnId')
  .get(checkAuth, cardController.getAllCards);

router
  .route('/:cardId')
  .get(checkAuth, cardController.getOneCard);

router
  .route('/:cardId/:columnId')
  .delete(checkAuth, cardController.deleteOneCard);

router
  .route('/title/:cardId')
  .patch(checkAuth, cardController.changeCardTitle);

router
  .route('/text/:cardId')
  .patch(checkAuth, cardController.changeCardText);

router
  .route('/label/:cardId')
  .patch(checkAuth, cardController.changeCardLabel);

router
  .route('/description/:cardId')
  .patch(checkAuth, cardController.changeCardDescription);
  
router
  .route('/same-column-reorder')
  .patch(checkAuth, cardController.reorderSameColumn)

router
  .route('/different-column-reorder')
  .patch(checkAuth, cardController.reorderDifferentColumn);


  module.exports = router;