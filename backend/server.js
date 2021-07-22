var app = require('express')();
var http = require('http').createServer(app);

const { 
  getFirebaseChannels,
  joinChannel,
  createChannel,
  sendMessage,
  channelsListener
} = require('./services/DataTransfer')

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

// channelsListener()
//   .then(result => setChannels(result.val()))

getFirebaseChannels()
  .then( result => setChannels(result))

// FEED SERVER DATA

// SOCKET EVENT LISTENERS
io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
  console.log('new client connected', socket.id);

  socket.emit('connection', channels);

  socket.on('channel-join', async function(id, _ , responseCallback){
    console.log('channel join', id);

    let joinedChannel = await joinChannel(id, socket.id)
    // console.log(joinedChannel)

    responseCallback(joinedChannel)
  });

  socket.on('channel-creation', async function(channelData, _, responseCallback){

    let createdChannel = await createChannel(channelData)

    responseCallback(createdChannel)

  })

// MESSAGE
  socket.on('send-message', async function(messagePackage, _, responseCallback){
    
    console.log("MESSAGE ", messagePackage)

    let channelData = await sendMessage(messagePackage)

    responseCallback(channelData)
    
  });

// DISCONNECT
  socket.on('disconnect', () => {
    console.log("desconnected " + socket.id )
      
    io.emit('client-disconnected', {client: socket.id});
  });

});

// CHANNEL LIST
app.get('/getChannels', (req, res) => {
  res.json({
      channels: MOCK_CHANNELS
  })
});