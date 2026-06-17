const { model } = require("mongoose");

const {
  FundsHistorySchema,
} = require("../schemas/FundsHistorySchema");

const FundsHistoryModel = new model(
  "fundshistory",
  FundsHistorySchema
);

module.exports = { FundsHistoryModel };