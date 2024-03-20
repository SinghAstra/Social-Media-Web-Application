const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
userSchema.statics.signUp = async function (email, password) {
  const userExists = await this.findOne({ email: email });
  if (userExists) {
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = await this.create({
    email: email,
    password: hash,
  });
  return newUser;
};

module.exports = mongoose.model("User", userSchema);
