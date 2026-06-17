const mongoose = require("mongoose");
const { StocksSchema } = require("../schemas/StocksSchema");

const StocksModel = mongoose.model(
  "stock",
  StocksSchema
);

module.exports = StocksModel;