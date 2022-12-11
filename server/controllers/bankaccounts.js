const { response } = require('express');
var sql = require('../config/database.js');
var Bankaccounts = module.exports;
var axios = require("axios").default;

Bankaccounts.addBankaccounts = async function (accountName, NIF, IBAN, idUser, titular) {

    const conta = await axios.post('http://94.60.175.136:3335/statements/' + IBAN)
    if (conta.data._id) {
        console.log("Entrei")
        return new Promise(function (resolve, reject) {
            sql.query(`INSERT INTO bankaccounts (accountName, NIF, IBAN, idUser,titular)
                    VALUES (?,?,?,?,?)`, [accountName, NIF, IBAN, idUser, titular],
                function (err, res) {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
        })
    }
    else {
        res.send(data).status(500)
    }

};



Bankaccounts.deleteBankaccounts = function (idBankAccount) {
    return new Promise(function (resolve, reject) {
        sql.query(`UPDATE bankaccounts  set valid = 0 where idBankAccounts = ?`, idBankAccount,
            function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    })
};


Bankaccounts.getBankaccounts = function (id) {
    return new Promise(function (resolve, reject) {
        sql.query(`SELECT idUser,titular, idBankAccounts, accountName, NIF, IBAN,titular
                   FROM bankaccounts 
                   where idUser=? and valid = 1`,
            id, function (err, res) {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else {
                    resolve(res)
                }
            });
    })
}

