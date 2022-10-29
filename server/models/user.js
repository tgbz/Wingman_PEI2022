var sql = require('../config/database.js');

var Apostador = function(a){
    this.Name=a.Nome;
    this.Apelido=a.Apelido
    this.email=a.email;
    this.password=a.password;
    this.nif=a.nif;
    this.birthdate=a.birthdate;
    this.cc=a.cc;
    this.Euro=a.Euro;
    this.ACA=a.ACA;
    this.Dolar=a.Dolar;
} 