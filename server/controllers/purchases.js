var sql = require('../config/database.js');
var Purchase = require('../models/purchase.js');
var Purchases = module.exports;
var Users = require("../controllers/users");
var Categories = require("../controllers/category");
const { query, rollback } = require('../config/database.js');
var axios = require("axios").default;
//const salt = 14;
//var bcrypt = require('bcryptjs')

Purchases.getProducts = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT pr.idProduct, pr.Description as description, ps.value, ps.quantity, ps.idcategory, c.name, c.is_essential as essential FROM purchase_has_subcategory  as ps
                    inner join product as pr on pr.idProduct = ps.idProduct
                    inner join category as c on ps.idCategory = c.idcategory
                    where ps.idPurchase = ?`,
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

Purchases.getPurchase = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT p.idPurchase, P.is_recurring,p.date,p.value, p.title, p.description,p.idUser,p.seller,p.type FROM purchase  as p
                    where p.idPurchase = ?`,
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


Purchases.getPurchaseProducts = function(id) {
    return new Promise(function(resolve,reject){
          Purchases.getPurchase(id)
          .then(purchase =>{
            Purchases.getProducts(id)
            .then(product =>{
                let aux = JSON.parse(JSON.stringify(purchase[0]));
                aux.products = product
                resolve(aux)
            })
            .catch(err =>{
                reject(err)
            })
          })
          .catch(err =>{
            reject(err)
          })
    })   
}

Purchases.deletePurchase = function (id){
    return new Promise(function(resolve, reject) {
        sql.query(`UPDATE purchase SET valid = 0 WHERE idPurchase = ?`,
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

Purchases.updatePurchase = function(id,is_recurring, date, value, title, description, idUser, seller,type,products) {
    return new Promise(function(resolve, reject) {
        Purchases.deletePurchase(id)
        .then(res =>{
            Purchases.addPurchase(is_recurring, date, value, title, description, idUser, seller,type,products)
            .then(purchase =>{
                resolve(purchase)
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



Purchases.getAllPurchase = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT p.idPurchase, p.is_recurring,p.title,p.date,p.value,p.description,p.idUser,p.seller,p.type,ps.idcategory, COUNT(*) AS magnitude  FROM purchase  as p
        inner join purchase_has_subcategory as ps on p.idPurchase= ps.idPurchase
        where p.idUser= ? and p.valid = 1
        group by p.idPurchase
        ORDER BY p.date desc, idPurchase desc`,
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


Purchases.getBalance = function(id,date) {
    var date = new Date(date);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay  = new Date(date.getFullYear(), date.getMonth()+1, 0);
    console.log(lastDay)
    return new Promise(function(resolve,reject){
        sql.query(`SELECT SUM(CASE WHEN type = 'Debito' THEN value END) AS despesa,  SUM(CASE WHEN type = 'Credito' THEN value END) AS income from purchase 
        where idUser = ? and (date BETWEEN ? AND ?)`,
        [id,firstDay,lastDay] ,function(err,res){
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



 Purchases.addPurchase = function (is_recurring, date, value, title, description, idUser, seller,type,products) {
    return new Promise(function(resolve, reject) {
        Purchases.createManualPurchase(is_recurring, date, value,title, description, idUser, seller,0,type)
        .then(insertedID =>{
            Object.values(products).forEach( i => {
                console.log(i)
                Purchases.addProduct(i.description)
                .then(product =>{
                    Purchases.addSubCategoryToProductbyID(product,i.idcategory)
                    .then(res=>{
                        console.log("res: "+res)
                        if(insertedID>0){
                            console.log(insertedID)
                            Purchases.addSubCategoryToPurchasebyID(insertedID,product,i.idcategory,i.value,i.quantity)
                            .then(result =>{
                                console.log("result: "+result)
                                Categories.addExpensesbyID(idUser,i.idcategory,i.value)
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
            
        })
        .catch(err =>{
            reject(err)
        })
    })
    };


Purchases.createManualPurchase = function (is_recurring, date, value, title, description, idUser, seller,isFromAPI,type) {
    console.log(is_recurring, date, value, title, description, idUser, seller,isFromAPI,type)
    return new Promise(function(resolve, reject) {
        sql.query(`INSERT INTO purchase (is_recurring, date, value, title, description, idUser,seller,isFromAPI,type,verified,valid) values (?,?,?,?,?,?,?,?,?,1,1)`,[is_recurring,date,value,title,description, idUser,seller,isFromAPI,type],
            function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res.insertId);
            }
        });
        })
    };

Purchases.addProduct = function (description) {
    return new Promise(function(resolve, reject) {
        sql.query(`INSERT INTO product (Description) VALUES(?)  ON DUPLICATE KEY UPDATE idProduct=LAST_INSERT_ID(idProduct);`,[description],
            function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res.insertId);
            }
        });
        })
    };


Purchases.addSubCategoryToProductbyID = function (idProduct,idCategory) {
    return new Promise(function(resolve, reject) {
        sql.query(`INSERT IGNORE INTO product_has_subcategory (idProduct,idCategory,updated_at,created_at) values (?,?,now(),now())`,[idProduct,idCategory],
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


Purchases.addSubCategoryToPurchasebyID = function (idPurchase,idProduct,idcategory,value,quantity) {
    console.log(idProduct)
    return new Promise(function(resolve, reject) {
        sql.query(`INSERT INTO purchase_has_subcategory (idPurchase,idProduct,idCategory,value,quantity)  values (?,?,?,?,?)`,[idPurchase,idProduct,idcategory,value,quantity],
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


// Upload de Purchases
Purchases.createPurchase = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified,connection) {
    return new Promise(function(resolve, reject) {
      connection.query(`INSERT IGNORE INTO purchase (is_recurring, date, value,title, description, idUser,seller,idMovement,isFromAPI,type,verified) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[is_recurring,date,value,seller,description, idUser,seller,idMovement,isFromAPI,type,verified],
          function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
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
                resolve(res);
            }
        });
        })
    };

Purchases.addSubCategoryToPurchase = function (idPurchase,idProduct,category,value,connection) {
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT INTO purchase_has_subcategory
                    SELECT ?,?,IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory , ?,1`,[idPurchase,idProduct,category,value],
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
            Purchases.addSubCategoryToProduct(idProduct,category,connection)
            .then(res=>{
                if(insertedID>0){
                    console.log(insertedID)
                    Purchases.addSubCategoryToPurchase(insertedID,idProduct,category,value,connection)
                    .then(result =>{
                        console.log(result)
                        Categories.addExpenses(idUser,category,value,connection)
                        .then(categoria =>{
                            console.log(categoria)
                            resolve(categoria)
                        })
                        .catch(err =>{
                            connection.rollback()
                            console.log(err)
                            reject (err)
                        })
                        
                        
                    })
                    .catch(err =>{
                        connection.rollback()
                        console.log(err)
                        reject (err)
                    })
                }
                else{
                    resolve()
                }
                
            })
            .catch(err =>{
                connection.rollback()
                reject(err)
            })
        })
        .catch(err =>{
            connection.rollback()
            reject(err)
        })
        })
    };



Purchases.uploadFromSibs = async function () {
    const UserList = await Users.getUsers()
    Object.values(UserList).forEach( i => {
        axios.get('http://94.60.175.136:3335/statements/'+i.IBAN)
        .then(async function(response){
                sql.getConnection(async function(err, connection) {
                movimentos = response.data.movimentos
                Object.values(movimentos).forEach( movimento => { 
                    let date = new Date(movimento.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
                    Purchases.uploadPurchases(0,date,movimento.value,movimento.description,i.idUser,movimento.issuer,movimento._id,1,movimento.type,0,movimento.category,1,connection)
                    .then(()=>{
                    })
                    .catch(err=>{
                        connection.rollback()
                        console.log(err)
                    })
                })
                console.log("No erros YEY!")
            })
        })
        .catch(function (error) {
            console.error(error);
        });
    })
};
// Buscar as despesas dos utilizadores diariamente

var requestPurchases = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(2000);
  const UserList = await Users.getUsers()
  Purchases.uploadFromSibs()
}, 86400000);



/*
86400000

*/

