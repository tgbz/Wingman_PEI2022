var sql = require('../config/database.js');
var Purchase = require('../models/purchase.js');
var Purchases = module.exports;
//const salt = 14;
//var bcrypt = require('bcryptjs')

Purchases.getPurchase = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT * 
                    FROM purchase 
                    where purchase.idUser=?
                    ORDER BY purchase.date desc`,
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

Purchases.getRecurrent = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT * FROM purchase where idUser=? and is_recurring = 1`,
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

 Purchases.cancelRecurrent = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`UPDATE purchase SET is_recurring = 0 WHERE  idPurchase = ?`, id ,function(err,res){
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

Purchases.createPurchase = function (idUser, ) {
    return new Promise(function(resolve, reject) {
      sql.query(`INSERT INTO purchase (is_recurring, date, value, description, idUser, tittle, seller,idMovement) VALUES (?,?,?,?,?,?,?,0)`,[is_recurring,date,value,description, idUser,tittle,seller,idMovement],
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