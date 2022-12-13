var sql = require('../config/database.js');
var Categories = module.exports;

// Get todas as categorias e o total gasto em cada
Categories.getCategory = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`select user_has_category.idUser, category.idcategory, category.name, user_has_category.plafond, user_has_category.total_spent
                    from category
                    inner join user_has_category on category.idcategory = user_has_category.idcategory
                    where user_has_category.idUser = ?`,
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




Categories.changePlafond = function (idUser,idCategory,plafond ) {
    return new Promise(function(resolve, reject) {
      sql.query(`UPDATE user_has_category  SET plafond = ? where idUser = ? AND idcategory=?`,[plafond, idUser,idCategory],
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



Categories.updateSpent = function (idUser,idCategory,total_spent ) {
    return new Promise(function(resolve, reject) {
        sql.query(`UPDATE user_has_category  SET total_spent = ? where idUser = ? AND idcategory=?`,[total_spent, idUser,idCategory],
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

Categories.addExpenses = function (idUser,category,total_spent,connection ) {
    return new Promise(function(resolve, reject) {
        connection.query(`UPDATE user_has_category AS cat,( SELECT IFNULL( (SELECT idCategory FROM category WHERE name = ?),22) as idCategory) AS idCat
        SET
            total_spent = total_spent + ?
        WHERE
            idUser=? and  cat.idCategory = idCat.idCategory;`,[category, total_spent, idUser],
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

Categories.addExpensesbyID = function (idUser,category,total_spent ) {
    return new Promise(function(resolve, reject) {
        sql.query(`UPDATE user_has_category 
        SET
            total_spent = total_spent + ?
        WHERE
            idUser=? and  idcategory = ?`,[total_spent, idUser,category],
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

