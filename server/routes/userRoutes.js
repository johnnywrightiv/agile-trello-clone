const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(userController.getAllUsers)
  // .post(userController.createUser);

router
  .route('/:userId')
//   .get(userController.getUser)
  .patch(userController.updateOrganization);
//   .delete(userController.deleteUser);

module.exports = router;