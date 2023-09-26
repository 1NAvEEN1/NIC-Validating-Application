const express = require("express");
const router = express.Router();
const AnalyticsController = require("../controllers/AnalyticsController");

router.get("/GenderCounts", AnalyticsController.getGenderCounts);
router.get("/SPCounts", AnalyticsController.getServiceProviderCounts);
router.get("/totalUserCount", AnalyticsController.getTotalUserCount);

module.exports = router;
