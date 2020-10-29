const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  //check if the recipient_id  exists before creating room
  if (req.body.recipient_id != null) {
    try {
      let recipient_user = await User.findById(req.body.recipient_id);
      req.user.recipient_id = recipient_user.id;
      // check if the room has already been created
      // code to be written
      next();
    } catch (error) {
      res.status(404).send("no recipient user found");
    }
  } else {
    res.status(500).send("No recipient id is sent");
  }
};
