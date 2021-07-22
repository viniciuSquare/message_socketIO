var firebase = require('./firabase')

// UNUSED
var channelsListener = async function(callbackFn) {
  let channelsRef = await firebase.database().ref("channels")
  let channelsSnapshot = channelsRef.once("value").then(snap => {
      return snap
    })
  // let channelsSnap = channelsRef.val()
  return channelsSnapshot
}

// Removes the attribute with the given keys and return the array of values
const parseFirabaseObjToArray = (data,...keys) => {
  keys.forEach( key => {
    data[key] = data[key] ? Object.values(data[key]) : []
  })

  return data
}

var getFirebaseChannels = async function() {
  const channelsRef = await firebase.database().ref("channels").get()

  let parsedChannels = Object.entries( channelsRef.val())
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

  return await parsedChannels
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
  await channelSocketsRef.push( socketId )
  
  return getChannelData(channelId)
}
async function createChannel(channelData) {
  const channelsRef = await firebase.database().ref('channels')
  const newChannelRef = await channelsRef.push(channelData)

  return getChannelData(newChannelRef.key);
}

var leaveChannel = async function(channelId, socketId) {
  const channelSockets = await firebase.database().ref(`channels/${channelId}`).get()
    // .then( res => res.val().sockets)

  if(channelSockets){
    let socketKey = Object.keys(channelSockets)
      .find( key => channelSockets[key] == socketId  )
    
    await firebase.database().ref(`channels/${channelId}/sockets/${socketKey}`).remove();
  }
  
}



module.exports = {
  getFirebaseChannels,
  joinChannel,
  leaveChannel,
  createChannel,
  sendMessage,
  channelsListener
}