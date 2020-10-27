const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  name: { type: String },
  topic: { type: String, default: "Some random topic" },
  users: { type: Array },
  messasges: { ref: "User" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Room", roomSchema);
