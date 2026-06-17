const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  openingBalance: {
    type: Number,
    default: 50000,
  },

  balance: {
    type: Number,
    default: 50000,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };