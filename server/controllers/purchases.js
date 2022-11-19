var sql = require('../config/database.js');
var Purchase = require('../models/purchase.js');
var Purchases = module.exports;
//const salt = 14;
//var bcrypt = require('bcryptjs')

Purchases.getPurchase = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT * FROM purchase where idUser=?`,
        id ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res[0])
            }
        });   
    })   
}
