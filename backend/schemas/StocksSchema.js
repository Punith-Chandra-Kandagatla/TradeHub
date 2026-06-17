const { Schema } = require("mongoose");

const StocksSchema = new Schema({
  name: String,
  price: Number,
  percent: String,
  isDown: Boolean,
});

module.exports = { StocksSchema };