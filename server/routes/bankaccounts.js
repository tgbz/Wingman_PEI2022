var express = require("express");
var router = express.Router();
var Bankaccounts = require("../controllers/bankaccounts");

router.post('/createBankAccount/',function(req,res){
  // Adicionar criar na API
    Bankaccounts.addBankaccounts(req.body.accountName, req.body.NIF, req.body.IBAN, req.body.idUser,req.body.titular)
        .then(bankaccount => res.jsonp(bankaccount))
        .catch(erro => res.status(500).jsonp(erro))
});

router.put("/deleteBankAccount/:id", function (req, res){
  Bankaccounts.deleteBankaccounts(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.get("/getBankAccounts/:id", function (req, res){
  Bankaccounts.getBankaccounts(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})


// Refresh bank account 

module.exports = router;
