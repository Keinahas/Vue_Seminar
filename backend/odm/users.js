const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  position: { type: String },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  nowAt: { type: String },
});

module.exports = mongoose.model("user", userSchema);
