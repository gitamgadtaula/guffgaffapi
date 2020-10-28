const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // topic: { type: String, default: "Some random topic" },
  users: { type: Array, required: true },
  messasges: { ref: "Message", type: mongoose.Schema.Types.ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { ref: "User", type: mongoose.Schema.Types.ObjectId },
});
module.exports = mongoose.model("Room", roomSchema);