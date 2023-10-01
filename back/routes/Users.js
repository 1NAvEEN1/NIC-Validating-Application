const express = require("express");
const router = express.Router();
const usersController = require("../controllers/UsersController");

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.post("/login", usersController.loginUser);
router.get("/:id", usersController.viewUser);
router.put("/:id", usersController.updateUser);
router.put("/disableUser/:UserName", usersController.disableUser);
router.post("/updatePassword", usersController.updatePassword);
module.exports = router;
