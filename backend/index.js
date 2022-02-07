var express = require('express');
var app = express();
var mysql = require('mysql');
const dotenv = require('dotenv');
var cors = require('cors');
// app.use(
//   function(req, res, next) {
//     // Mọi domain
//     res.header("Access-Control-Allow-Origin", "*");
   
//     // Domain nhất định
//     // res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
   
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   }
// );

app.use(cors());//{origin: 'http://localhost:3001'}
dotenv.config();

//body parser
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb', extended: true }))

var routes = require('./api/routes')
routes(app)

// app.use(express.static(__dirname + '/build'));


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/build' + '/index.html');
// });

// var conn = mysql.createConnection({
//   database: process.env.DATABASE_NAME,
//   host: "localhost",
//   user: '' + process.env.USER,
//   password: ''+ process.env.PASSWORD
// });

// conn.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.get('/', function (req, res) {
//   const sql = 'Select * from khuvuc';
//   conn.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log('Example app listening on port 3001!');
});

