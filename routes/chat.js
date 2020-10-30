const express = require("express");
const router = express.Router();
// // importing ChatController
var ChatController = require("../controllers/ChatController");

var Auth = require("../middleware/Auth");
var Room = require("../middleware/Room");

router.post("/create", Auth, Room, ChatController.create);

module.exports = router;
