var express = require("express");
var router = express.Router();
var Bankaccounts = require("../controllers/bankaccounts");

router.post('/createBankaccount/',function(req,res){
    Bankaccounts.createBankaccount(req.body)
        .then(bankaccount => res.jsonp(bankaccount))
        .catch(erro => res.status(500).jsonp(erro))
});