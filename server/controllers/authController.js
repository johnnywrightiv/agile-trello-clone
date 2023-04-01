const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

// function to create a jwt
const createToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.signup = async (req, res) => {
  try {

    const { email, password } = req.body;

    const newUser = await User.create({
      email: email,
      password: password
    });

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide an email and password"
      })
    } else {
      // creates new user
      const token = createToken(newUser._id);
    
      // logs in the user by sending JWT
      return res.status(201).json({
        token,
        user: newUser,
      })
    }
  } catch (err) {
    return res.status(404).json({
      message: err.message
    })
  }
};

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

    const token = createToken(user._id);

    return res.status(200).json({
      token
    })
  } catch (err) {
    return res.status(404).json({
      message: err.message
    });
  }
}