var sql = require('../config/database.js');
var Categories = module.exports;

// Get todas as categorias e o total gasto em cada
Categories.getCategory = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`select user_has_category.user_idUser, category.idcategory, category.name, user_has_category.plafond, user_has_category.total_spent
                    from category
                    inner join user_has_category on category.idcategory = user_has_category.category_idcategory
                    where user_has_category.user_idUser = ?`,
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