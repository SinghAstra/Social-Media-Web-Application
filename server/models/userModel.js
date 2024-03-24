const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("Missing Credentials");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Weak password");
  }
  const userExists = await this.findOne({ email: email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    username: username,
    email: email,
    password: hash,
  });
  return newUser;
};

userSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw Error("Missing Credentials");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
