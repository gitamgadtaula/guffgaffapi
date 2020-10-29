const express = require("express");
const router = express.Router();
var Auth = require("../middleware/Auth");
var Room = require("../middleware/Room");

// importing UserController
var RoomController = require("../controllers/RoomController");

router.post("/create", Auth, Room, RoomController.create);
router.get("/", RoomController.getAll);
router.get("/findroom",Auth, RoomController.findRoom);
module.exports = router;
