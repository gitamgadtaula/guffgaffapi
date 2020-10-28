const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  room: { ref: "Room" },
  user: { ref: "User" },
  msg: { type: String },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", msgSchema);
