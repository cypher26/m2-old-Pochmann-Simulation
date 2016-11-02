'use strict';

const express = require('express');

const path = require('path');


var mysql = require('mysql');


const PORT = process.env.PORT || 5000;
// const INDEX = path.join(__dirname, '/views/index.html');

var router = express.Router();
router.get("/",function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

const server = express()
	.use("/",router)
	.use("/",express.static(__dirname + '/public'))
	.use("/node_modules/angular/",express.static(__dirname + '/node_modules/angular/'))
  // .use(function(req, res) {
  // 		res.sendFile(INDEX); 
  // 		// res.sendFile(INDEX); 

  // })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


const socketIO = require('socket.io');
const io = socketIO(server);

io.set('transports', ['xhr-polling']);
io.set("polling duration", 10);

// io.set('log level',3);

// var db_name = "b18_19015896_rubiksbattle";

// var connection = mysql.createConnection({  
//   host     : 'sql311.byethost18.com',  
//   user     : 'b18_19015896',  
//   password : '54072440'
//   // database : 'b18_19015896_rubiksbattle'
// }); 

// connection.connect(function(err){
//   if(err){
//     console.log('Database connection error' + err);
//   }else{
//     console.log('Database connection successful');
//   }
// });

var arrayUser = [];


io.sockets.on('connection', function (socket) {

  socket.on('adduser', function(username, room){
      // store the username in the socket session for this client
      socket.username = username;
      // store the room name in the socket session for this client
      socket.room = room;
      // add the client's username to the global list
      socket.join(room);
      console.log(username + " " + "entered the room" + " " + arrayUser.length);
      // arrayUser[arrayUser.length] = username;
      // echo to client they've connected
      //socket.emit('updatechat', socket.username , 'entered the ' + socket.room);
      // echo to room 1 that a person has connected to their room
      //io.sockets.in(socket.room).emit('updatechat', socket.username, ' entered the ' + socket.room);


      //socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');

      //socket.emit('updaterooms', rooms, 'room1');
  });
  

    // socket.join(12);
  socket.on('scrambleCube', function (data){
    //io.sockets.in(socket.room).emit('scrambleC',data);

    socket.broadcast.to(socket.room).emit('scrambleC',data);

  });
  socket.on('disconnect', function(){
    console.log(socket.username + " " + 'has leaved');
  });

  // socket.on('scrambleCube1', function (data){
  //  //io.sockets.in(socket.room).emit('scrambleC1',data);
  //  socket.broadcast.to(socket.room).emit('scrambleC1',data);
  // });



  socket.on('updatePixels', function (data){
    io.sockets.in(socket.room).emit('playerPixels',data);
  });
  socket.on('updatePixels1', function (data){
    io.sockets.in(socket.room).emit('playerPixels1',data);
  });



  // socket.on('sendAlg', function (data) {
  
  // if (socket.username == 'player1'){
  //  io.sockets.in(socket.room).emit('updatePlayer1', data);
  // }
  // else if (socket.username == 'player2'){
  //  io.sockets.in(socket.room).emit('updatePlayer2', data);
  // }
  // });
  

});


// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));

	

// });



setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
