var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credential: false
  }
});

const PORT = 4001;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});
// END SERVER CONFIG
var MOCK_CHANNELS = [{
  name: 'Global chat',
  participants: 0,
  id: 0,
  sockets: []
}, {
  name: 'Funny',
  participants: 0,
  id: 1,
  sockets: []
}, {
  name: 'SAD',
  participants: 0,
  id: 4,
  sockets: []
}];

const getLoggedSockets = () => {
  let socketsList = []
  
  MOCK_CHANNELS.forEach( channel => {
    socketsList.push(...channel.sockets)
  } )

  return socketsList
}


// SOCKET EVENT LISTENERS
io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
  console.log('new client connected');

  socket.emit('connection', null);

  socket.on('channel-join', id => {
    console.log('channel join', id);

    MOCK_CHANNELS.forEach(channel => {
      if (channel.id == id) {
        // if socket isn't at the channel, add it
        if (channel.sockets.indexOf(socket.id) == (-1)) {
          console.log("new socket client")
          channel.sockets.push(socket.id);
          channel.participants++;

          console.log(MOCK_CHANNELS)
          io.emit('channel', MOCK_CHANNELS);
        }
        console.log(channel)
      } else {
          console.log("AQUI CARAI")
          let index = channel.sockets.indexOf(socket.id);
          if (index != (-1)) {
            channel.sockets.splice(index, 1);
            channel.participants--;
            
            console.log(MOCK_CHANNELS)
            io.emit('channel', MOCK_CHANNELS);
          }
      }
    });

    return id;
  });

// MESSAGE
  socket.on('send-message', message => {
    
    console.log("MESSAGE ", message.text)

    MOCK_CHANNELS.forEach( channel => {
    
      if (channel.id === message.channel_id) {
        if (!channel.messages) {
          channel.messages = [message];
          console.log("FIRST", channel)

        } else {
          channel.messages.push(message);
          console.log("THERE IS MSG", channel)
        }
      }

    });
    
    io.emit('message', MOCK_CHANNELS);
  });

// DISCONNECT
  socket.on('disconnect', () => {
    console.log("desconnected " + socket.id )
      MOCK_CHANNELS.forEach(channel => {
          let index = channel.sockets.indexOf(socket.id);
          if (index != (-1)) {
              channel.sockets.splice(index, 1);
              channel.participants--;
              io.emit('channel', channel);
          }
      });
  });

});

// CHANNEL LIST
app.get('/getChannels', (req, res) => {
  res.json({
      channels: MOCK_CHANNELS
  })
});