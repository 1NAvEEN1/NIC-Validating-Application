const express = require("express");
const router = express.Router();
const AnalyticsController = require("../controllers/AnalyticsController");

router.get("/GenderCounts", AnalyticsController.getGenderCounts);

module.exports = router;
