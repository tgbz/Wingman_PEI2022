var sql = require('../config/database.js');
var Bankaccounts = module.exports;

Bankaccounts.addBankaccounts = function (IdUser, IBAN, idBanKAccounts, inserted_at, deleted_at, valid) {
    return new Promise(function(resolve, reject) {
      sql.query(`INSERT INTO bankaccounts(IdUser, IBAN, idBanKAccounts, inserted_at, deleted_at, valid)
                 VALUES (?,?,?,?,?,?)`,[IdUser, IBAN, idBanKAccounts, inserted_at, deleted_at, valid],
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