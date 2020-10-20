const express = require("express");
const router = express.Router();
//importing route files
const userRoutes = require("./users");
router.get("/", (req, res) => {
  const str = { msg: "Express is up and running.." };
  res.send(str);
});
router.use("/user", userRoutes);
module.exports = router;
