var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
var conn = mysql.createConnection({
    database: process.env.DATABASE_NAME,
    host: "localhost",
    user: '' + process.env.USER,
    password: ''+ process.env.PASSWORD
  });

module.exports = conn
