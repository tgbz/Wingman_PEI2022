var session = require('express-session');
var mysql = require('mysql2');

var db_config = {
  host: '94.60.175.136',
  user: 'wingman_admin',
  port: 3306,
  password: 'password',
  database: 'wingman',
  timezone: "Z",
  multipleStatements: true,
}

var connection = mysql.createPool(db_config)

connection.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});


module.exports = connection;
