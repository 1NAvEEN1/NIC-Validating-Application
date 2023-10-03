const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getMobileNumberByUsername = async (req, res) => {
    try {
      const { UserName } = req.params; // Assuming you pass the username as a URL parameter
  
      // Find the user by username and retrieve the MobileNo field
      const user = await Users.findOne({
        where: { UserName },
        attributes: ["MobileNo"],
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return the user's mobile number
      res.json({ MobileNo: user.MobileNo });
    } catch (error) {
      console.error("Error fetching mobile number by username:", error);
      res.status(500).json({ error: "Failed to fetch mobile number" });
    }
  };

  exports.updatePassword = async (req, res) => {
    try {
      const { UserName, NewPassword } = req.body;
  
      // Find the user by username
      const user = await Users.findOne({ where: { UserName } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Hash and update the new password
      const newPasswordHash = await bcrypt.hash(NewPassword, 10);
      user.Password = newPasswordHash;
  
      await user.save(); // Save the updated user
  
      res.json("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Failed to update password" });
    }
  };