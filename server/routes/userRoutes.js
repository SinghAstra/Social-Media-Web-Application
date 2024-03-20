const express = require("express");
const router = express.Router();
const {
  signUpController,
  logInController,
} = require("../controllers/userController");

router.post("/logIn", logInController);
router.post("/signUp", signUpController);

module.exports = router;
