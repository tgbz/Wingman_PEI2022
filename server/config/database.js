var session = require('express-session');
var mysql = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);
var db_config = {
  host: 'localhost',
  user: 'localUser',
  password: 'localUser',
  database: 'wingman',
  timezone: "Z",
  multipleStatements: true
}

var connection = mysql.createPool(db_config)

connection.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});


module.exports = connection;
var sessionStore = new MySQLStore({}, connection);
module.exports = sessionStore;