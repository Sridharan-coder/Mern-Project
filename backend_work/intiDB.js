const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',     // host for connection
  port: 3306,
  user: 'root',
  password: '',
  //   database : 'my_db'
});

connection.connect(function (err) {
  if (err) {
    console.log("error occurred while connecting");
  } else {
    console.log("connection created with mysql successfully");
  }
});

module.exports = db;