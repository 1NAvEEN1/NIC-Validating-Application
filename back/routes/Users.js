const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/", async (req, res) => {
  try {
    const {
      UserName,
      Password,
      Name,
      NIC,
      DOB,
      Age,
      Gender,
      Address,
      MobileNo,
      ServiceProvider,
    } = req.body;
    bcrypt.hash(Password, 10).then((hash) => {
      Users.create({
        UserName: UserName,
        Password: hash,
        Name: Name,
        NIC: NIC,
        DOB: DOB,
        Age: Age,
        Gender: Gender,
        Address: Address,
        MobileNo: MobileNo,
        ServiceProvider: ServiceProvider,
      });
      res.json("Success");
    });
  } catch (error) {
    console.error("Error save records:", error);
    res.status(500).json({ error: "Failed to save records" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    const user = await Users.findOne({ where: { UserName } });
    if (!user) {
      return res.status(400).json({ error: "User Doesn't Exist" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Wrong Credentials" });
    } else {
      const jwToken = jwt.sign({ UserName: user.UserName }, "important");
      return res.status(200).json(jwToken);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/", async (req, res) => {
//   const {username, password} = req.body;
//   await Users.create(user);
//   res.json(user);
// });

module.exports = router;
