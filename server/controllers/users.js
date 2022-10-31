var sql = require('../config/database.js');
var Users = module.exports;

Users.register = function (u) {    
    console.log("here i am")
    const saltHash=genPassword(req.body.password);
    console.log(saltHash);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    var parameters = [u.name, hash, u.email, u.birthDate, u.gender, u.savings]
    console.log(parameters);
    return new Promise(function(resolve, reject) {
    sql.query("INSERT INTO users ( name, password, email , birthDate, gender, savings) VALUES ( ?, ?, ?, ?, ?, ?)", parameters, function (err, res) {
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                resolve(res.insertId);
            }
        });   
    })       
};


    
/*User.login = function(u){
    console.log(u)
    return new Promise(function(resolve,reject){
        sql.query("Select * from user where email= ?",u.email ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                bcrypt.compare(u.password, res.password, function (err, isMatch) {
                    callback(null, isMatch);
                });
            }
        });   
    })       
};*/


Users.getOne = function(email) {
    return new Promise(function(resolve,reject){
        sql.query("Select * from user where email= ?",email ,function(err,res){
            if(err) {
                console.log("error: ", err);
                reject(err);
            }
            else{
                console.log(res[0]);
                resolve(res[0]);
            }
        });   
    })   
}



Users.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		callback(null, isMatch);
	});
}


