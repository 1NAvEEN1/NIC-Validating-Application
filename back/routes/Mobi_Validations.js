const express = require("express");
const router = express.Router();
const { Mobi_Validations } = require("../models");

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const listOfRecords = await Mobi_Validations.findAll();
    res.json(listOfRecords);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

router.post("/", async (req, res) => {
  const Record = req.body;
  try {
    const newRecord = await Mobi_Validations.create(Record);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error creating Record:", error);
    res.status(500).json({ error: "Failed to create Record" });
  }
});

module.exports = router;

