var app = require('express')();
var http = require('http').createServer(app);

const { getFirebaseChannels, joinChannel, leaveChannel } = require('./services/DataTransfer')

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
//  ----------------
let channels

function setChannels(newChannels) {
  channels = newChannels
}

getFirebaseChannels()
  .then(result => setChannels(result))

// FEED SERVER DATA


const parseClientsList = (clientsObj) => clientsObj && Object.values(clientsObj)

MOCK_CHANNELS = [1, 2, 3]

// SOCKET EVENT LISTENERS
io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
  console.log('new client connected');

  socket.emit('connection', channels);

  socket.on('channel-join', id => {
    console.log('channel join', id);

    joinChannel(id, socket.id)
  
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
    leaveChannel()
    // console.log(socket)

      // MOCK_CHANNELS.forEach(channel => {
      //     let index = channel.sockets.indexOf(socket.id);
      //     if (index != (-1)) {
      //         channel.sockets.splice(index, 1);
      //         channel.participants--;
      //         io.emit('channel', channel);
      //     }
      // });
  });

});

// CHANNEL LIST
app.get('/getChannels', (req, res) => {
  res.json({
      channels: MOCK_CHANNELS
  })
});