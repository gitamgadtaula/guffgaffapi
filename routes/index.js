const express = require("express");
const router = express.Router();
//importing route files
const userRoutes = require("./users");
const roomRoutes = require("./room");
router.get("/", (req, res) => {
  const str = { msg: "Express is up and running.." };
  res.send(str);
});
router.use("/user", userRoutes);
router.use("/room", roomRoutes);
module.exports = router;
