const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
    unique: true,
    // ref: "User",
    // type: mongoose.Schema.Types.ObjectId,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  // created_by: { ref: "User", type: mongoose.Schema.Types.ObjectId },
});
module.exports = mongoose.model("Room", roomSchema);
