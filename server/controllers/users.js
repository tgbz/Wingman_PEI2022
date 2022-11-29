var sql = require('../config/database.js');
var User = require('../models/user.js');
var Users = module.exports;
const salt = 5;
var bcrypt = require('bcryptjs');
const connection = require('../config/database.js');

// Registo do Utilizador
Users.create = function(u,conn){
    return new Promise(function(resolve, reject) {
    bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(u.password,salt,function(err,hash){
            let parameters = [u.name,hash,u.email,u.birthdate,u.gender,0,new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') ]
            
                conn.query("INSERT INTO user ( name, password, email, birthDate, gender,is_valid,creation_date) VALUES ( ?, ?, ?, ?, ?, ?,?)", parameters, function (err, res) {
                        if(err) {
                            console.log("error: ", err);
                            reject(err);
                        }
                        else{
                            console.log(res.insertId)
                            resolve(res.insertId);
                        }
                    });   
                }) 
        })
    })
}

Users.initWallet = function(id,conn){
return new Promise(function(resolve, reject) {
        conn.query("INSERT INTO wallet (idUser) VALUES (?)", id, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    console.log(res.insertId)
                    resolve(res.insertId);
                }
            });   
    })
}


Users.register = function (newUser) {
    return new Promise(function(resolve, reject) {
        sql.getConnection(function(err,conn){
             if (err) {
                reject("Error occurred while getting the connection");
            }
             conn.beginTransaction(function(err){
                if (err) {
                    reject (err);
                }
                if(!isEmailValid(newUser.email)){
                    conn.rollback(()=> {
                        conn.release()
                        reject("Email invalido")
                    })
                }
                else{
                    Users.getOne(newUser.email,conn)
                    .then(user=>{
                        if(user==null){
                            Users.create(newUser,conn)
                            .then(id =>{
                                Users.initWallet(id,conn)
                                .then(id=>{
                                    conn.commit((err)=>{
                                        if(err){
                                            conn.rollback(()=> {
                                                conn.release()
                                                reject(err)
                                            })
                                        }
                                        resolve(id)
                                        conn.release()
                                    });
                                })
                                .catch(err=>{
                                    conn.rollback(() => {
                                        conn.release();
                                        return reject("Inserting to wallet failed");
                                    });
                                })
                            })
                            .catch(err=>{
                                conn.rollback(() => {
                                        conn.release();
                                        return reject("Inserting to User failed");
                                    });
                            })
                        }
                        else{
                            conn.commit(function(err) {
                                if (err) {
                                conn.rollback(() => reject(err))
                                }
                                reject("Já existe uma conta associada a este utilizador")
                            })
                                        
                        }
                    })
                    .catch(err =>{
                        conn.release();
                        reject(err);
                    })
                }
                
            })
            conn.release();
            if(err) reject(err);
        })
    })
}


Users.getOne = function(email,conn) {
    let user = null
    return new Promise(function(resolve,reject){
        conn.query("Select idUser from user where email= ?",email ,function(err,res){
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


// Utilizado para o Login
Users.getUserbyEmail = function(email) {
    let user = null
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


// Utilizado para o perfil do Utilizador
Users.getUser = function(id) {
    return new Promise(function(resolve,reject){
        sql.query(`Select u.name,u.email,u.birthdate,u.gender from user  as u where u.idUser=?`,
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
        sql.query(`UPDATE user u
                    SET u.name = ? , u.gender = ?, u.birthdate = ?
                    WHERE u.idUser = ?`,
            [body.name,body.gender,body.birthdate,id] ,function(err,res){
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

Users.getPassword = function(id){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT u.password from user as u WHERE u.idUser = ?`,[id], function (err, res) {
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

Users.changePassword = function(id,newpassword){
    return new Promise(function(resolve, reject) {
    bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(newpassword,salt,function(err,hash){
                sql.query(`UPDATE user u SET  u.password = ? WHERE u.idUser = ?`,[hash,id] ,function(err,res) {
                        if(err) {
                            console.log("error: ", err);
                            reject(err);
                        }
                        else{
                            resolve(res);
                        }
                    });   
                }) 
        })
    })
}

Users.updatePassword = function(id,password,newpassword){
    return new Promise(function(resolve, reject) {
        Users.getPassword(id,password)
        .then(user =>{
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (isMatch) {
                    Users.changePassword(id,newpassword)
                        .then(res =>{
                            console.log(res)
                            resolve(res)
                            console.log("UPDATED!")
                        })
                        .catch(err =>{
                            reject(err)
                        })
                } else {
                    reject(err)
                }
            })
        })
        .catch(err =>{
            reject(err)
        })

    })
}


var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}