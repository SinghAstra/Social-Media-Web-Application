const express = require("express");
const router = express.Router();
const {
  signUpController,
  logInController,
} = require("../controllers/userController");

router.post("/log-in", logInController);
router.post("/sign-up", signUpController);
router.post("/send-verification-email",)

module.exports = router;
