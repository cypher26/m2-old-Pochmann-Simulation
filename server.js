'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');


var mysql = require('mysql');
var scrambler = require('./js/scrambler.js');
var pochmann = require('./matrixManip/matrixManip5.js');


const PORT = process.env.PORT || 5000;
// const INDEX = path.join(__dirname, '/views/index.html');

var router = express.Router();
router.get("/",function(req,res){
  res.sendFile(__dirname + "/views/index.html");
});

const server = express()
	.use("/",router)
	.use("",express.static(__dirname + '/views'))
	.use("/js",express.static(__dirname + '/js'))
	.use("/css",express.static(__dirname + '/css'))
	.use("/fonts",express.static(__dirname + '/fonts'))
	.use("/node_modules/angular/",express.static(__dirname + '/node_modules/angular/'))
  // .use(function(req, res) {
  // 		res.sendFile(INDEX); 
  // 		// res.sendFile(INDEX); 

  // })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



const io = socketIO(server);

var db_name = "b18_19015896_rubiksbattle";

var connection = mysql.createConnection({  
  host     : 'sql311.byethost18.com',  
  user     : 'b18_19015896',  
  password : '54072440'
  // database : 'b18_19015896_rubiksbattle'
}); 

connection.connect(function(err){
  if(err){
    console.log('Database connection error' + err);
  }else{
    console.log('Database connection successful');
  }
});

io.sockets.on('connection', function (socket) {
		 console.log('Client connected hehe');

		 	
});

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));

	

// });



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
