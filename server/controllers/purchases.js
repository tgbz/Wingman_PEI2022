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
        sql.query(`SELECT p.is_recurring,p.value,p.description,p.idUser,p.seller,p.type,ps.idcategory,c.name,c.is_essential,pr.Description as product FROM purchase  as p
                    inner join purchase_has_subcategory as ps on p.idPurchase= ps.idPurchase
                    inner join product as pr on pr.idProduct = ps.idProduct
                    inner join category as c on ps.idCategory = c.idcategory
                    where p.idPurchase = ?
                    ORDER BY p.date desc`,
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

Purchases.getAllPurchase = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT p.is_recurring,p.value,p.description,p.idUser,p.seller,p.type,ps.idcategory,c.name,c.is_essential,pr.Description as product FROM purchase  as p
                    inner join purchase_has_subcategory as ps on p.idPurchase= ps.idPurchase
                    inner join product as pr on pr.idProduct = ps.idProduct
                    inner join category as c on ps.idCategory = c.idcategory
                    where p.idUser= ?
                    ORDER BY p.date desc`,
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
      (connection || sql).query(`INSERT IGNORE INTO purchase (is_recurring, date, value, description, idUser,seller,idMovement,isFromAPI,type,verified) VALUES (?,?,?,?,?,?,?,?,?,?)`,[is_recurring,date,value,description, idUser,seller,idMovement,isFromAPI,type,verified],
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                console.log(res.insertId)
                resolve(res.insertId);
            }
        });
       })
    };

Purchases.addSubCategoryToProduct = function (idProduct,category,connection) {
    return new Promise(function(resolve, reject) {
        (connection || sql).query(`INSERT IGNORE INTO product_has_subcategory
                    SELECT ?,IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory,now(),now();`,[idProduct,category],
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

Purchases.addSubCategoryToPurchase = function (idPurchase,idProduct,category,value,connection) {
    return new Promise(function(resolve, reject) {
        (connection || sql).query(`INSERT INTO purchase_has_subcategory
                    SELECT ?,?,IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory , ?`,[idPurchase,idProduct,category,value],
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

Purchases.uploadPurchases = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,category,idProduct,connection) {
    
    return new Promise(function(resolve, reject) {
        Purchases.createPurchase(is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,connection)
        .then(insertedID =>{
            console.log(JSON.stringify(insertedID))
            Purchases.addSubCategoryToProduct(idProduct,category,connection)
            .then(res=>{
                if(insertedID>0){
                    console.log(parseInt(insertedID))
                    Purchases.addSubCategoryToPurchase(insertedID,idProduct,category,value,connection)
                    .then(result =>{
                        Categories.addExpenses(idUser,category,value,connection)
                        .then(categoria =>{
                            resolve(categoria)
                        })
                        .catch(err =>{
                            console.log(err)
                            reject (err)
                        })
                        
                        
                    })
                    .catch(err =>{
                        console.log(err)
                        reject (err)
                    })
                }
                else{
                   resolve()
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


    Purchases.addPurchase = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,category,idProduct) {
    return new Promise(function(resolve, reject) {
        Purchases.createPurchase(is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified)
        .then(insertedID =>{
            Purchases.addSubCategoryToProduct(idProduct,category)
            .then(res=>{
                console.log("res: "+res)
                if(insertedID>0){
                    console.log(insertedID)
                    Purchases.addSubCategoryToPurchase(insertedID,idProduct,category,value)
                    .then(result =>{
                        console.log("result: "+result)
                        Categories.addExpenses(idUser,category,value)
                        .then(categoria =>{
                            console.log("categoria: "+categoria)
                            resolve(categoria)
                        })
                        .catch(err =>{
                            console.log(err)
                            reject (err)
                        })
                    })
                    .catch(err =>{
                        console.log(err)
                        reject (err)
                    })
                }
                else{
                   reject("Algo correu mal")
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
  //const UserList = await Users.getUsers()
  const UserList=[{idUser: 1},{idUser: 2}]
  console.log(UserList)
  Object.values(UserList).forEach( i => {
    axios.get('http://94.60.175.136:3335/statements/update/'+i.idUser)
  .then(async function(response){
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        movimentos = response.data.movimentos
        Object.values(movimentos).forEach( movimento => {
            let date = new Date(movimento.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            queryPromises.push(Purchases.uploadPurchases(0,date,movimento.value,movimento.description,i.idUser,movimento.issuer,movimento._id,1,movimento.type,0,movimento.category,1,connection))
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
  })
}, 86400000);



/*
86400000

*/

