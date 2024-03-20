const User = require("../models/userModel");

const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signUp(email, password);
    res.status(201).json({ message: "User Created", user });
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
