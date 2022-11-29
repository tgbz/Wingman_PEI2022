var mongoose = require("mongoose");

var StatementSchema = new mongoose.Schema({
  _id: {},
  banco: String,
  IBAN: String,
  movimentos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  saldo: Number,
});

module.exports = mongoose.model("Statement", StatementSchema, "statements");
