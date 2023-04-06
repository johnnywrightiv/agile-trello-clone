const express = require('express');
const checkAuth =  require("./../middleware/checkAuth");
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(checkAuth, userController.getAllUsers)

router
  .route('/:userId')
//   .get(userController.getUser)
  .patch(checkAuth, userController.updateOrganization);
//   .delete(userController.deleteUser);

module.exports = router;