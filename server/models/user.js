var sql = require('../config/database.js');

var User = function(a){
    this.name=a.name;
    this.password=a.password;
    this.email=a.email;
    this.birthDate=a.birthDate;
    //this.nif = a.nif;
    this.gender=a.gender;
    this.savings = a.savings;
} 

module.exports=User;