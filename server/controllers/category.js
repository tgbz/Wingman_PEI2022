var sql = require('../config/database.js');
var Categories = module.exports;

// Get todas as categorias e o total gasto em cada
Categories.getCategory = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`SELECT * FROM categories where idUser=?`,
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