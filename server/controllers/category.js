var sql = require('../config/database.js');
var Users = require("../controllers/users");
const schedule = require('node-schedule');
var Categories = module.exports;


// Get todas as categorias e o total gasto em cada
Categories.getCategory = function(id) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Promise(function(resolve,reject){
        sql.query(`select user_has_category.idUser, category.idcategory, category.name, user_has_category.plafond, user_has_category.total_spent, category.is_essential, date
                    from category
                    inner join user_has_category on category.idcategory = user_has_category.idcategory
                    where user_has_category.idUser = ? and date = ?`,
        [id,firstDay] ,function(err,res){
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

Categories.getCategorybyMonth = function(id,date) {
    var date = new Date(date);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Promise(function(resolve,reject){
        sql.query(`select user_has_category.idUser, category.idcategory, category.name, user_has_category.plafond, user_has_category.total_spent, category.is_essential, date
                    from category
                    inner join user_has_category on category.idcategory = user_has_category.idcategory
                    where user_has_category.idUser = ? and date = ?`,
        [id,firstDay] ,function(err,res){
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



Categories.changePlafonds = function (idUser,idCategory,plafond,connection ) {
    return new Promise(function(resolve, reject) {
      connection.query(`INSERT INTO user_has_category
            (idUser,idCategory,plafond)
            VALUES
            (?,?,?)
            as new_foo
            on duplicate key update
            plafond = new_foo.plafond`,[idUser,idCategory,plafond],
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


Categories.changeAllPlafonds = function (idUser,categorias) {
    return new Promise ((resolve,reject)=>{
      sql.getConnection(async function(err, connection) {
      try {
        connection.beginTransaction()
        const queryPromises = []
        Object.values(categorias).forEach( category => {
            queryPromises.push(Categories.changePlafonds(idUser,category.idcategory,category.plafond,connection))
        })
        const results = await Promise.all(queryPromises)
        connection.commit()
        connection.release()
        console.log("Acabei")
        console.log(results)
        resolve(results)
    } 
    catch (err) {
        console.log("error ", err);
        connection.rollback()
        connection.release()
        reject(err)
    }
})
    })
    

};



      


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

Categories.addExpenses = function (idUser,category,total_spent,date,connection ) {
    var date = new Date(date);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log(firstDay)
    return new Promise(function(resolve, reject) {
        connection.query(`INSERT into user_has_category (idUser,idcategory,plafond,total_spent,date) values 
        (?, IFNULL( (SELECT idCategory FROM category WHERE name = ?),11),0,?,?) ON DUPLICATE KEY UPDATE    total_spent = total_spent +?

        `,[idUser,category, total_spent,firstDay,total_spent],
            function (err, res) {
            if(err){
                console.log("error: ", err);
                reject(err);
            }
            else{
                console.log("Eu "+idUser +" alterei "+category+ " em "+total_spent)
                resolve(res);
            }
        });
        })
    };

Categories.addExpensesbyID = function (idUser,category,total_spent,date ) {
    var date = new Date(date);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return new Promise(function(resolve, reject) {
        sql.query(`INSERT INTO user_has_category  (idUser, idCategory, plafond, total_spent, date) VALUES(?,?,0,?,?) ON DUPLICATE KEY UPDATE    total_spent = total_spent +? `,[idUser,category,total_spent,firstDay,total_spent],
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


    Categories.getAllCategories = function () {
        return new Promise(function(resolve, reject) {
            sql.query(`select idCategory from category`,
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


    Categories.createCategories = function (idUser,idcategory) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        return new Promise(function(resolve, reject) {
            sql.query(`Insert into user_has_category (idUser,idcategory,plafond,total_spent,date) values (?,?,0,0,?)`,[idUser,idcategory,firstDay],
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

    Categories.createAllcategories = async function () {
        var categorias = await Categories.getAllCategories()
        var users = await Users.listUsers()
        Object.values(users).forEach(user =>{
            Object.values(categorias).forEach( category => {
                Categories.createCategories(user.idUser,category.idCategory)
            })
        })
    };

    schedule.scheduleJob('0 0 0 1 */1 *', function () {
        Categories.createAllcategories()
    });

