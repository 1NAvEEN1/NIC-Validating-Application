const express = require("express");
const router = express.Router();
const ForgotPasswordController = require("../controllers/ForgotPasswordController");

router.get("/OTP/:UserName", ForgotPasswordController.getMobileNumberByUsername);

module.exports = router;
