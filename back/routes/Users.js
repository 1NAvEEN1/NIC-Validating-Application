const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

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

router.post("/login" , async (req, res) => {
  const { UserName, Password} = req.body;

  const user = await Users.findOne({where: { UserName : UserName}});
  if (!user) res.json ({error: "User Doesn't Exist"})

  bcrypt.compare(Password, user.Password).then((match) => {
    if (!match) res.json({error: "Wrong Credentials"});

    res.json("Logged in")
  })
})

// router.post("/", async (req, res) => {
//   const {username, password} = req.body;
//   await Users.create(user);
//   res.json(user);
// });

module.exports = router;
