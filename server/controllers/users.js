var sql = require('../config/database.js');
var User = require('../models/user.js');
var Users = module.exports;
const salt = 14;
var bcrypt = require('bcryptjs')

Users.create = function(u){
    return new Promise(function(resolve, reject) {
    bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(u.password,salt,function(err,hash){
            let parameters = [u.name,hash,u.email,u.birthdate,u.gender,u.savings]
            
                sql.query("INSERT INTO user ( name, password, email, birthDate, gender, savings) VALUES ( ?, ?, ?, ?, ?, ?)", parameters, function (err, res) {
                        if(err) {
                            console.log("error: ", err);
                            reject(err);
                        }
                        else{
                            console.log(res)
                            resolve(res.idUser);
                        }
                    });   
                }) 
        })
    })
}

Users.register = function (newUser) {
    return new Promise(function(resolve, reject) {
    Users.getOne(newUser.email)
    .then(user=>{
        if(user==null){
            Users.create(newUser)
            .then(id =>{
                resolve(id)
            })
            .catch(err=>{
                reject(err)
            })
        }
        else{
            reject("Já existe uma conta associada a este utilizador")
        }
    })
    .catch(err =>{
        reject(err)
    })
    })
}



Users.getOne = function(email) {
    let user = null
    console.log("Ola " + email)
    return new Promise(function(resolve,reject){
        sql.query("Select * from user where email= ?",email ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                if(res[0]){
                    console.log(res[0])
                    user=res[0]
                }
                resolve(user);
            }
        });   
    })   
}



Users.getUser = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`Select user.name,user.password,email,birthdate,gender,savings,user.idWallet,rendimento,euro from user 
                    inner join wallet on user.idWallet = wallet.idWallet where idUser=?`,
        id ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res[0])
            }
        });   
    })   
}

Users.updateUser = function(id,body) {
    return new Promise(function(resolve,reject){
        /*sql.query(`Update user set name = ? , gender = ?, birthdate = ?, savings = ?
                where idUser = ?`,
        [body.name,body.gender,id] ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res[0])
            }
        });*/
        sql.query(`UPDATE user u, wallet w
                    SET u.name = ? , u.gender = ?, u.birthdate = ?, u.savings = ?,
                        w.rendimento = ? , w.euro = ?
                    WHERE u.idUser = ? AND u.idWallet = w.idWallet;`,
            [body.name,body.gender,body.birthdate,body.savings,body.rendimento,body.euro,id] ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res[0])
            }
        }); 

        
    })   
}