var mongoose = require("mongoose");
var Statement = require("../models/statement");
var MongoQuery = require("../config/query.js");
var Transactions = require("./transactionsController");
mongoose.set("useFindAndModify", false);
var Statements = module.exports;

var BankList = [
  "Banco BPI",
  "Caixa Geral de Depósitos",
  "Banco Santander",
  "Crédito Agrícola",
  "Millennium BCP",
  "Activo Bank",
  "Banco Best",
  "Bankinter",
];

//Get the Statement, with 20% probability of creating 1,2,3 or 4 new transactions, when retrieving the statement, it should also return the transactions object
Statements.getStatement = function (iban, callback) {
  Statement.findOne({ IBAN: iban })
    .populate("movimentos")
    .exec(function (err, statement) {
      if (err) {
        callback(err);
      } else {
        if (statement) {
          callback(null, statement);
        } else {
          callback(null, null);
        }
      }
    });
};

//create 1,2,3 or 4 new transactions, and update the Statement
Statements.updateStatement = function (iban, callback) {
  var newTransactions = [];
  var newBalance = 0;
  var newTransactionsCount = Math.floor(Math.random() * 4) + 1;
  for (var i = 0; i < newTransactionsCount; i++) {
    var tmpTransaction = Transactions.newTransaction(iban);
    if (tmpTransaction.type == "Debito") {
      newBalance -= tmpTransaction.value;
    } else {
      newBalance += tmpTransaction.value;
    }
    newTransactions.push(tmpTransaction);
    Transactions.create(newTransactions[i], function (err, transaction) {
      if (err) {
        callback(err);
      }
    });
    Statement.findOneAndUpdate(
      { IBAN: iban },
      { $push: { movimentos: newTransactions[i]._id } },
      function (err, Statement) {
        if (err) {
          callback(err);
        }
      }
    );
  }
  console.log(newBalance);

  //update the Statement balance
  Statement.findOneAndUpdate(
    { IBAN: iban },
    { $inc: { saldo: newBalance } },
    function (err, Statement) {
      if (err) {
        console.log(err);
        callback(err);
      }
    }
  );

  Statements.getStatement(iban, function (err, Statement) {
    if (err) {
      callback(err);
    } else {
      callback(null, Statement);
    }
  });
};

//Get Statement by IBAN
Statements.getStatementByIBAN = function (iban, callback) {
  Statement.findOne({ IBAN: iban }, function (err, Statement) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, Statement);
    }
  });
};

Statements.initStatement = function (iban, callback) {
  var newStatement = new Statement({
    _id: new mongoose.Types.ObjectId(),
    banco: BankList[Math.floor(Math.random() * BankList.length)],
    IBAN: iban,
    movimentos: [],
    saldo: 0,
  });
  try {
    //Generate 10 random transactions and add them to the Statement
    for (var i = 0; i < 10; i++) {
      var transaction = Transactions.newTransaction(newStatement._id);
      newStatement.movimentos.push(transaction._id);
      if (transaction.type == "Debito") {
        newStatement.saldo -= transaction.value;
      } else if (transaction.type == "Credito") {
        newStatement.saldo += transaction.value;
      }

      try {
        Transactions.create(transaction, function (err, transaction) {
          if (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    try {
      //save the Statement
      newStatement.save(function (err, newStatement) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          console.log("Statement created");
          callback(null, Statement);
        }
      });
    } catch (err) {
      console.log(err);
    }
    callback(null, newStatement);
  } catch (err) {
    console.log(err);
  }
};
