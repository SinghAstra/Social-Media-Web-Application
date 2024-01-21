const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Function to handle user sign-in
const signIn = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check for missing credentials
    if (!email || !password) {
      return res.json({ message: "Missing Credentials." });
    }

    // Find user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return a successful response with user details and token
    return res
      .status(200)
      .json({ result: user, token, message: "Sign-in successful." });
  } catch (error) {
    // Handle internal server error
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Function to handle user sign-up
const signUp = async (req, res) => {
  try {
    // Extract user details from the request body
    const { firstName, lastName, email, password } = req.body;

    // Check for missing credentials
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing Credentials." });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    // If user already exists, return an error response
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists." });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database
    const createdUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    // Generate a JWT token for the newly created user
    const token = jwt.sign(
      { email, id: createdUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return a successful response with user details and token
    return res
      .status(200)
      .json({ result: createdUser, token, message: "Sign-up successful." });
  } catch (error) {
    // Handle internal server error
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Export the functions for use in other modules
module.exports = { signIn, signUp };
