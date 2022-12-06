var express = require("express");
var router = express.Router();
var Bankaccounts = require("../controllers/bankaccounts");

router.post('/createBankAccount/',function(req,res){
    Bankaccounts.addBankaccounts(req.body.accountName, req.body.NIF, req.body.IBAN, req.body.idUser)
        .then(bankaccount => res.jsonp(bankaccount))
        .catch(erro => res.status(500).jsonp(erro))
});

router.put("/deleteBankAccount/:id", function (req, res){
  Bankaccounts.deleteBankaccounts(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

router.get("/getBankAccount/:id", function (req, res){
  Bankaccounts.getBankaccounts(req.params.id)
  .then( dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
