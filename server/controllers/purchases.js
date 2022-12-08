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

Purchases.createPurchase = function (is_recurring, date, value, description, idUser, seller,idMovement,isFromAPI,type,verified) {
    return new Promise(function(resolve, reject) {
      sql.query(`INSERT IGNORE INTO purchase (is_recurring, date, value, description, idUser,seller,idMovement,isFromAPI,type,verified) VALUES (?,?,?,?,?,?,?,?,?,?)`,[is_recurring,date,value,description, idUser,seller,idMovement,isFromAPI,type,verified],
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


// Buscar as despesas dos utilizadores diariamente

var requestPurchases = setInterval(async function(){
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  await delay(2000);
  const UserList = await Users.getUsers()
  Object.values(UserList).forEach( i => {
    axios.get('http://94.60.175.136:3335/statements/update/'+i.idUser)
  .then(async function(response){
    sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        movimentos = response.data.movimentos
        Object.values(movimentos).forEach( movimento => {
            console.log(movimento)
            let date = new Date(movimento.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')
            queryPromises.push(Purchases.createPurchase(0,date,movimento.value,movimento.description,i.idUser,"",movimento.issuer,movimento._id,1,movimento.type,0))
            queryPromises.push(Categories.addExpenses(movimento.category,i.idUser,movimento.value))
            //Adicionar total spent à categoria e meter na categoria também no produto como não especificado
        })
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
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
}, 360);



/*
86400000
INSERT INTO user_has_category (idUser,idCategory,plafond,total_spent)
select 1,idCategory,10,100 from category where name = "Casa"

*/

