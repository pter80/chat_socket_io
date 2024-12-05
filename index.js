
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
  
  console.log('a user connected');
  socket.on("join237", ()=>{
    socket.join("room 237");
    console.log("a rejoin la 237");
    console.log("rooms : ",socket.rooms);
  })
  socket.on("out237",() =>{
    socket.leave("room 237");
    //io.to("room 237").emit(`user ${socket.id} has left the room`);
    console.log(socket.id +" est sorti de la 237");
    console.log("rooms : ",socket.rooms);
    
  })
  
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('send plop',(msg) => {
    io.emit("chat message","PLIP");
  })
  socket.broadcast.emit('hi');
});

//io.emit('hello', 'world'); 
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
