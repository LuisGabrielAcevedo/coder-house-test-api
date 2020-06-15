const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: String, default: null },
  updatedAt: { type: String, default: null },
});

module.exports = mongoose.model("User", UserSchema);
