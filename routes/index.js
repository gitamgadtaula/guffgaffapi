const express = require("express");
const router = express.Router();
//importing route files
const userRoutes = require("./users");
const roomRoutes = require("./room");
const chatRoutes = require("./chat");

router.get("/", (req, res) => {
  const str = { msg: "Express is up and running.." };
  res.send(str);
});
router.use("/user", userRoutes);
router.use("/room", roomRoutes);
router.use("/chat", chatRoutes);
module.exports = router;
