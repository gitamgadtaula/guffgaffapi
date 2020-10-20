const express = require("express");
const router = express.Router();
// importing UserController
var UserController = require("../controllers/UserController");
var Auth = require("../middleware/Auth");

// fetching the user model
const User = require("../models/User");

// fetching all users
router.get("/", UserController.getAll);

router.post("/login", UserController.login);

router.get("/me", Auth, UserController.me);

//creating a new user
router.post("/create", UserController.create);

//fetching a user by his id
router.get("/:id", UserController.getUser);

//delete a user by his id
router.delete("/:id", UserController.deleteUser);

// async function userMiddleWare(req, res, next) {
//   let user = null;
//   try {
//     user = await User.findById(req.params.id);
//     if (user == null) {
//       res.status("404").send("user not found");
//     }
//   } catch (error) {
//     res.send("some error occured" + error);
//   }
//   user = res.user;
//   next();
// }

module.exports = router;
