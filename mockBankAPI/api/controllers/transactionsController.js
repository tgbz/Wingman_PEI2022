var mongoose = require("mongoose");
var Transaction = require("../models/transaction");
var Transactions = module.exports;

var categorias = [
  "Compras",
  "Transportes",
  "Lazer",
  "Saúde",
  "Educação",
  "Outros",
];
var tipos = ["Débito", "Crédito"];

var emissoresDébito = [
  "Pingo Doce",
  "Continente",
  "Worten",
  "Cinemas",
  "PSP",
  "Finanças",
  "McDonalds",
  "Burger King",
  "PizzaHut",
  "FitnessUp",
  "Fnac",
  "Universidade do Minho",
  "Levantamento ATM",
];

var emissoresCrédito = [
  "Empregador",
  "Prémio",
  "Reembolso",
  "Transferência de João",
  "Transferência de Maria",
  "Transferência de José",
  "Transferência de Ana",
  "Transferência de Pedro",
  "Transferência de Sofia",
];

var moeda = ["EUR", "USD"];

//Gerar uma transação aleatória
Transactions.newTransaction = function (statementID) {
  //Random date and time between now and yesterday
  var tmpCategoria;
  var tmpEmissor = "";
  var tmpDescricao = "";
  var tmpValor = 0;
  var tmpMoeda = moeda[Math.floor(Math.random() * moeda.length)];
  var date = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var randomDate = new Date(
    yesterday.getTime() + Math.random() * (date.getTime() - yesterday.getTime())
  );

  var tmpTipo = tipos[Math.floor(Math.random() * tipos.length)];
  if (tmpTipo == "Débito") {
    tmpValor = Math.floor(Math.random() * 900) + 1;
    tmpCategoria = categorias[Math.floor(Math.random() * categorias.length)];
    tmpEmissor =
      emissoresDébito[Math.floor(Math.random() * emissoresDébito.length)];
    tmpDescricao = tmpEmissor + " - " + tmpCategoria;
  } else {
    tmpValor = Math.floor(Math.random() * 1000);
    tmpCategoria = "Recebimento";
    tmpEmissor =
      emissoresCrédito[Math.floor(Math.random() * emissoresCrédito.length)];
    tmpDescricao = "Recebimento de " + tmpEmissor;
  }

  var transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    type: tmpTipo,
    date: randomDate,
    issuer: tmpEmissor,
    description: tmpDescricao,
    value: tmpValor,
    category: tmpCategoria,
    currency: tmpMoeda,
    statement: statementID,
  });
  console.log(transaction);
  return transaction;
};

//Create a single transaction
Transactions.create = async function (transaction, callback) {
  try {
    var trans = new Transaction(transaction);
    trans = await trans.save();
    console.log("Transaction created");
    callback(null, transaction);
  } catch (err) {
    console.log(err);
    callback(err, null);
  }
};
