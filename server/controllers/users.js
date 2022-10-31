var sql = require('../config/database.js');
var User = require('../models/user.js');
var Users = module.exports;
const salt = 14;
var bcrypt = require('bcryptjs')

Users.create = function(u){
    bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(u.password,salt,function(err,hash){
            let parameters = [u.name,hash,u.email,u.birthdate,u.gender,u.savings]
            return new Promise(function(resolve, reject) {
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

    /*
    Users.getOne({email: newUser.email}, (err,user) => {
        if (!user) {
            bcrypt.genSalt(salt, function(err, salt) {
                bcrypt.hash(newUser.password, salt, async function (err, hash) {
                    newUser.password = hash
                    try {
                        newUser = await newUser.save()
                        callback(null, newUser)
                    } catch (error) {
                        callback(error, null)
                    }
                })
            })
        }
        else 
            callback(null,false)
    })*/
}








Users.getOne = function(email) {
    let user = null
    return new Promise(function(resolve,reject){
        sql.query("Select * from user where email= ?",email ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                if(res[0]){
                    user=res[0]
                }
                resolve(user);
            }
        });   
    })   
}



