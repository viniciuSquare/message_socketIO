var firebase = require('./firebase')
// Removes the attribute with the given keys and return the array of values
const parseFirabaseObjToArray = (data,...keys) => {
  keys.forEach( key => {
    data[key] = data[key] ? Object.values(data[key]) : []
  })

  return data
}

const parseChannels = (channelsSnapshot) => {
  let parsedChannels = Object.entries( channelsSnapshot )
    .map( channel => { 
      return {
        id : channel[0], 
        ...channel[1]
      }
    }
  )

// REMOVE PRIVADE DATA
  parsedChannels.forEach( channel => {
    delete channel.messages
    
    channel.participants = channel.sockets ? 
      Object.values(channel.sockets).length 
      : 0;
    
    delete channel.sockets

    console.log(channel)
  })

  return parsedChannels
}

var channelsListener = async function(callbackFn) {
  let channelsRef = await firebase.database().ref("channels")
  channelsRef.on("value", async function(snapshot){
    callbackFn( parseChannels(snapshot.val()) )
  })
}

var getFirebaseChannels = async function() {
  const channelsRef = await firebase.database().ref("channels").get()
  
  return parseChannels(channelsRef.val())
} 

async function getChannelData(channelId) {
  const channelRef = await firebase.database().ref(`channels/${channelId}`).get();
  let channelData = await channelRef.val();
  channelData.id = await channelRef.key;
  
  channelData = parseFirabaseObjToArray(channelData, "messages", "sockets");

  return channelData;
}

var sendMessage = async function(messageData) {
  let {channelId, text, senderId, time} = messageData;

  const channelRef = await firebase.database().ref(`channels/${channelId}/messages`)
  await channelRef.push({
      text, 
      senderId,
      time
    })
  console.log("IT SEEMS OK", time)

  return getChannelData(channelId)
}

async function joinChannel(channelId, socketId) {
  const channelSocketsRef = firebase.database().ref(`channels/${channelId}/sockets`)

  const socketsSnapshot = await channelSocketsRef.get()
  const channelSockets = Object.values(socketsSnapshot.val()) 
  
  let socketJoinedKey;
  if (channelSockets.indexOf(socketId) === (-1)){
    socketJoinedRef = await channelSocketsRef.push( socketId )

  } else  
    console.log("Já tava aqui")

  

  return {
    joinedChannel : await getChannelData(channelId),
    socketJoinedKey : socketJoinedRef.key
  }
}

const isSocketLogged = ( socketId ) => {
  
}

async function createChannel(channelData) {
  const channelsRef = await firebase.database().ref('channels')
  const newChannelRef = await channelsRef.push(channelData)

  return newChannelRef.key;
}

var leaveChannel = async function(channelId, socketKey) {
  await firebase.database().ref(`channels/${channelId}/sockets/${socketKey}`).remove()  
}



module.exports = {
  getFirebaseChannels,
  joinChannel,
  leaveChannel,
  createChannel,
  sendMessage,
  channelsListener
}