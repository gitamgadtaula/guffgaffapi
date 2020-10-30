const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  room: { ref: "Room", type: mongoose.Schema.Types.ObjectId },
  sender: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  message: { type: String },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Message", msgSchema);
