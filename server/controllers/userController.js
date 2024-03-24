const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.signUp(username, email, password);
    const token = createToken(user._id);
    const userInfo = { ...user._doc, token };
    res.status(201).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.logIn(email, password);
    const token = createToken(user._id);
    const userInfo = { ...user._doc, token };
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const handleVerifyEmail = async () => {
  try {
    const response = await axios.post('/api/send-verification-email', {
      email,
    });

    console.log('Email sent successfully!', response.data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = {
  signUpController,
  logInController,
};
