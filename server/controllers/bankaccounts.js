const { response } = require('express');
var sql = require('../config/database.js');
var Bankaccounts = module.exports;
var axios = require("axios").default;
var Purchases = require("../controllers/purchases");


Bankaccounts.createAccount = async function (accountName, NIF, IBAN, idUser, titular,connection) {
    return new Promise(function (resolve, reject) {
            connection.query(`INSERT INTO bankaccounts (accountName, NIF, IBAN, idUser,titular)
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

Bankaccounts.addBankaccounts = async function (accountName, NIF, IBAN, idUser, titular) {
    const conta = await axios.post('http://94.60.175.136:3335/statements/' + IBAN)
    return new Promise(function (resolve, reject) {
    if (conta.data._id) {
        axios.get('http://94.60.175.136:3335/statements/'+IBAN)
        .then(async function(response){
            sql.getConnection(async function(err, connection) {
                if(err){
                    connection.release();
                    response.status(400).send(err);
                    return;
                }
                try {
                    connection.beginTransaction()
                    const queryPromises = []
                    queryPromises.push(Bankaccounts.createAccount(accountName, NIF, IBAN, idUser, titular,connection))
                    movimentos = response.data.movimentos
                    Object.values(movimentos).forEach( movimento => {
                        let date = new Date(movimento.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        queryPromises.push(Purchases.uploadPurchases(0,date,movimento.value,movimento.description,idUser,movimento.issuer,movimento._id,1,movimento.type,0,movimento.category,1,connection))
                    })
                    const results = await Promise.all(queryPromises)
                    connection.commit()
                    connection.release()
                    resolve("Adicionado com sucesso") 
                    } 
                catch (err) {
                    console.log("error ", err);
                    connection.rollback()
                    connection.release()
                    }
                reject(err)
                })
            
        })
        .catch(function (error) {
            console.error(error);
        });
        
    }
})
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

