var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
  _id: {},
  date: Date,
  issuer: String,
  description: String,
  value: Number,
  category: String,
  currency: String,
  type: String,
  statement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Statement",
  },
});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);
