const { Schema } = require("mongoose");

const FundsHistorySchema = new Schema({
  userId: String,
  type: String, // ADD or WITHDRAW
  amount: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { FundsHistorySchema };