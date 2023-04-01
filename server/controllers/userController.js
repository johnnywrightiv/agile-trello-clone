const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      users: users,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    })
  }
};

exports.getUser = (req, res) => {
  res.status(500).json({
    message: 'This route is not yet defined',
  });
};
