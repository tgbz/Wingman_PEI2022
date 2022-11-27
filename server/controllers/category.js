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
      sql.query(`REPLACE INTO user_has_category (idUser,idCategory,plafond) VALUES (?, ?,?)`,[idUser,idCategory,plafond],
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