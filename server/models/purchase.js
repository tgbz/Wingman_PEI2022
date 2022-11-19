var sql = require('../config/database.js');

var Purchase = function(a){
    this.is_recuring=a.is_recuring;
    this.date=a.date;
    this.value=a.value;
    this.description=a.description;
    //this.nif = a.nif;
    this.tittle=a.tittle;
    this.seller = a.seller;
} 

module.exports=Purchase;