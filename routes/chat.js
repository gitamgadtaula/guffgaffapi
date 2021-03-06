const express = require("express");
const router = express.Router();
// // importing ChatController
var ChatController = require("../controllers/ChatController");

var Auth = require("../middleware/Auth");
var Room = require("../middleware/Room");
var FindRoom = require("../middleware/FindRoom");

router.post("/create", Auth, Room, ChatController.create);
router.post("/getall", Auth, Room, FindRoom, ChatController.getAll);

module.exports = router;
