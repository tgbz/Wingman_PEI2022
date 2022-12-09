var sql = require('../config/database.js');
var Purchase = require('../models/purchase.js');
var Purchases = module.exports;
var Users = require("../controllers/users");
var Categories = require("../controllers/category");
var axios = require("axios").default;
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

Purchases.createPurchase = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,connection) {
    return new Promise(function(resolve, reject) {
      connection.query(`INSERT IGNORE INTO purchase (is_recurring, date, value, description, idUser,seller,idMovement,isFromAPI,type,verified) VALUES (?,?,?,?,?,?,?,?,?,?)`,[is_recurring,date,value,description, idUser,seller,idMovement,isFromAPI,type,verified],
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                //console.log(res)
                resolve(res.insertId);
            }
        });
       })
    };

Purchases.addSubCategoryToProduct = function (idProduct,category,connection) {
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT IGNORE INTO product_has_subcategory
                    SELECT ?,IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory,now(),now();`,[idProduct,category],
            function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                //console.log(res)
                resolve(res);
            }
        });
        })
    };

Purchases.addSubCategoryToPurchase = function (idPurchase,idProduct,category,value,connection) {
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT INTO purchase_has_subcategory
                    SELECT ?,?,IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory , ?`,[idPurchase,idProduct,category,value],
            function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                //console.log(res)
                resolve(res);
            }
        });
        })
    };

Purchases.uploadPurchases = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,category,connection) {
    
    return new Promise(function(resolve, reject) {
        Purchases.createPurchase(is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,connection)
        .then(insertedID =>{
            Purchases.addSubCategoryToProduct(1,category,connection)
            .then(res=>{
                if(insertedID>0){
                    console.log(insertedID)
                    Purchases.addSubCategoryToPurchase(insertedID,1,category,value,connection)
                    .then(result =>{
                        console.log("OLA  "+ result)
                        console.log("OLEEE  "+ insertedID)
                        resolve(result)
                    })
                    .catch(err =>{
                        console.log(err)
                        reject (err)
                    })
                }
                else{
                   resolve(res)
                }
                
            })
            .catch(err =>{
                reject(err)
            })
        })
        .catch(err =>{
            reject(err)
        })
        })
    };

// Buscar as despesas dos utilizadores diariamente

var requestPurchases = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(2000);
  const UserList = await Users.getUsers()
  console.log(UserList)
  //Object.values(UserList).forEach( i => {
    axios.get('http://94.60.175.136:3335/statements/1')
  .then(async function(response){
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        movimentos = response.data.movimentos
        Object.values(movimentos).forEach( movimento => {
            //console.log(movimento)
            let date = new Date(movimento.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            //console.log(date)
            queryPromises.push(Purchases.uploadPurchases(0,date,movimento.value,movimento.description,1,movimento.issuer,movimento._id,1,movimento.type,0,movimento.category,connection))
            //queryPromises.push(Purchases.createPurchase(0, date, movimento.value, movimento.description, 1, movimento.issuer,movimento._id,1,movimento.type,0,connection))
            //queryPromises.push(Purchases.addSubCategoryToProduct(1,movimento.category,connection))
            //queryPromises.push(Purchases.addSubCategoryToPurchase(insertedID,1,movimento.category,movimento.value,connection))
            queryPromises.push(Categories.addExpenses(1,movimento.category,movimento.value,connection))
        })
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        console.log("Acabei")
        return results
        } catch (err) {
        console.log("error ", err);
            connection.rollback()
            connection.release()
        }
    })
  })
  .catch(function (error) {
    console.error(error);
  });
  //})
}, 60000);



/*
86400000

*/

