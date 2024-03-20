const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signUp(email, password);
    const token = createToken(user._id);
    res.status(201).json({ message: "User Created", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logInController = async (req, res) => {
  res.json({ success: "success" });
};

module.exports = {
  signUpController,
  logInController,
};
