const express = require("express");
const router = express.Router();
var Auth = require("../middleware/Auth");

// importing UserController
var RoomController = require("../controllers/RoomController");

router.post("/create",Auth, RoomController.create);
router.get("/", RoomController.getAll);
module.exports = router;
