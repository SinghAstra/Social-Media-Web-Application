const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Missing Credentials." });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found." });
    }

    const isPasswordCorrect = bcrypt.hash(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { email, id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log("SignIn Error ", error);
  }
};

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing Credentials." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log("SignUp Error ", error);
  }
};

module.exports = { signIn, signUp };
