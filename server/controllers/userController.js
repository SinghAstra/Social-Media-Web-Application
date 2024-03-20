const User = require("../models/userModel");

const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Missing Credentials" });
    }
    const user = await User.signUp(email, password);
    res.status(201).json({ message: "User Created", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const logInController = async (req, res) => {
  res.json({ success: "success" });
};

module.exports = {
  signUpController,
  logInController,
};
