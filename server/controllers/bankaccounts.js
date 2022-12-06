var sql = require('../config/database.js');
var Bankaccounts = module.exports;

Bankaccounts.addBankaccounts = function (accountName,NIF,IBAN,idUser) {
    return new Promise(function(resolve, reject) {
      sql.query(`INSERT INTO bankaccounts (accountName, NIF, IBAN, idUser)
                 VALUES (?,?,?,?)`,[accountName,NIF,IBAN,idUser],
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res);
            }
        });
       })
    };



Bankaccounts.deleteBankaccounts = function (idBankAccount) {
    return new Promise(function(resolve, reject) {
      sql.query(`UPDATE bankaccounts  set valid = 0 where idBankAccounts = ?`,idBankAccount,
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res);
            }
        });
       })
    };


Bankaccounts.getBankaccounts = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT bankaccounts.idUser, bankaccounts.idBankAccounts, bankaccounts.accountName, bankaccounts.NIF, bankaccounts.IBAN
                   FROM bankaccounts 
                   where bankaccounts.idUser=?`,
        id ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res)
            }
        });   
    })   
}

