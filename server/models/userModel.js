const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Username required!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Valid email required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
    select: false,
  },
});

// pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
})

// bcrypt password compare method on User model
userSchema.methods.correctPassword = async function(comparedPassword, userPassword) {
  return await bcrypt.compare(comparedPassword, userPassword)
}

module.exports = mongoose.model('User', userSchema);
