var sql = require('../config/database.js');
var Categories = module.exports;

// Get todas as categorias e o total gasto em cada
Categories.getCategory = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`select category.idUser, category.idcategory, category.name, sum(subcategory.plafond) as total_plafond_category, sum(subcategory.total_spent) as total_spent_category
                   from category
                   inner join subcategory on category.idcategory = subcategory.idcategory
                   where category.idUser = ? 
                   group by category.idcategory`,
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