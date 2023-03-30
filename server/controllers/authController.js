const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const createToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.signup = async (req, res) => {
  try {
    // creates new user
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // creates JWT
    const token = createToken(newUser._id);
  
    // logs in the user by sending JWT
    res.status(201).json({
      token,
      user: newUser,
    })
  } catch (err) {
    res.status(409).json({
      message: err.message
    })
  }
};

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({message: "Please provide email and password"});
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !await user.correctPassword(password, user.password)) {
      return res.status(401).json({message: "Incorrect email or password"});
    }

    const token = createToken(user._id);

    res.status(200).json({
      token
    })
  } catch (err) {
    res.status(404).json({message: err.message});
  }
  
}