const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res
          .status(404)
          .json({ message: 'No users found' });
    } else {
      res.status(200).json({
        users: users,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
};

// PATCH - change board title
exports.updateOrganization = async (req, res) => {
  try {
    const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate(userId, { organization: req.body.organization }, { new: true })
  
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: 'Unable to find the that user' });
      } else {
        return res.status(200).json({ updatedUser: updatedUser });
      }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
