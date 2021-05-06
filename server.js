const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app, (req, res)=>{
  res.writeHead(204,{
      'Acces-Control-Allow-Origin':'*',
      'Acces-Control-Allow-Methods': 'OPTIONS, GET, POST',
  })
  res.end('hey there')

});

const io = socketIo(server, {
  cors: {
      origin: '*', 
      credentials: false
  }
}); // < Interesting!

let interval;

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  // if (interval) {
  //   clearInterval(interval);
  // }

  // interval = setInterval(() => getApiAndEmit(socket), 1000);

// Chatting
  socket.on('chat message', message => {
    socket.broadcast.emit('chat message', message)
  })

  socket.on('typing', socketUser => {
    socket.broadcast.emit('is typing', socketUser.id)
  })

// room router
  
  socket.on('join-room', (roomId, userId) =>{
    // add user on the same room
    socket.join(roomId)
    // send others that a user joined
    socket.to(roomId).broadcast.emit('user-connected', userId)
    socket.on('disconnect', ()=>{
        console.log("disconnected!", roomId, userId)
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })

// close
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    clearInterval(interval);

  });

});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
