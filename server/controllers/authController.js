const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

// POST - signs in user
exports.signup = async (req, res) => {
  try {

    const { email, password, organization } = req.body;
    const newUser = await User.create({
      email: email,
      password: password,
      organization: organization
    });

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide an email and password"
      })
    } else {
      return res.status(201).json({
        user: newUser,
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
};

// POST - logs user in
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "Please provide an email, and password"});
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !await user.correctPassword(password, user.password)) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN })

    return res.status(200).json({
      token
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}