const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const listOfUsers = await Users.findAll({
      attributes: {
        exclude: ["Password"], // Exclude the 'Password' attribute from the result
      },
    });
    res.send(listOfUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
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
    console.error("Error saving records:", error);
    res.status(500).json({ error: "Failed to save records" });
  }
};

exports.loginUser = async (req, res) => {
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
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the user ID as a URL parameter

    // Find the user by ID
    const user = await Users.findByPk(id, {
      attributes: [
        "UserName",
        "Name",
        "NIC",
        "DOB",
        "Age",
        "Gender",
        "Address",
        "MobileNo",
        "ServiceProvider",
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the user ID as a URL parameter
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

    // Find the user by ID
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user properties
    user.UserName = UserName;
    user.Name = Name;
    user.NIC = NIC;
    user.DOB = DOB;
    user.Age = Age;
    user.Gender = Gender;
    user.Address = Address;
    user.MobileNo = MobileNo;
    user.ServiceProvider = ServiceProvider;

    if (Password) {
      // If a new password is provided, hash and update it
      const hash = await bcrypt.hash(Password, 10);
      user.Password = hash;
    }

    await user.save(); // Save the updated user

    res.json("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
