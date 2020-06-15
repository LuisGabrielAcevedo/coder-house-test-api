const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  title: { type: String, required: true },
  state: { type: String, required: true }, // CREATED | ASSIGNED | IN_PROGRESS | COMPLETED
  description: { type: String, default: "" },
  createdBy: { type: Schema.ObjectId, ref: "User", default: null },
  assignedTo: { type: Schema.ObjectId, ref: "User", default: null },
  createdAt: { type: String, default: null },
  updatedAt: { type: String, default: null },
});

module.exports = mongoose.model("Task", UserSchema);
