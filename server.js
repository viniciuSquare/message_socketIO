const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const { Server } = require("socket.io");
const io = new Server(server);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('./index.html');
});

io.on('connection', (socket) => {
  io.emit('login', socket.id)

  socket.on('disconnect', () => {
    io.emit('logout', socket.id)
  })

  socket.on('chat message', message => {
    socket.broadcast.emit('chat message', message)
  })

  socket.on('typing', socketUser => {
    socket.broadcast.emit('is typing', socketUser.id)
  })
});

const port = 3000;
server.listen(port, () => {
  console.log(`YEAAP ${port}`);
});