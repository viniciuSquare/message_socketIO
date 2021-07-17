var firebase = require('./firabase')


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

  return parsedChannels
} 

var getChannelData = async function(channelId) {
  const channelRef = await firebase.database().ref(`channels/${channelId}`)
  // .get()


}

var joinChannel =  async function(channelId, socketId) {
  const channelSocketsRef = await firebase.database().ref(`channels/${channelId}/sockets`)
  await channelSocketsRef.push( socketId )
  // console.log(channelSocketsRef)


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
  leaveChannel
}



//     parsedChannels.forEach( channel => {
//       channel.sockets = parseClientsList(channel.sockets)
//     } )

//     return parsedChannels
//   })

// }

// function getChannelData(channelId) {



//   return channelData;
// }

// const parseClientsList = (clientsObj) => clientsObj && Object.values(clientsObj)

// function pushSocket(channelId) {

// }

// function hello () { 
//   console.log("Hello! It worked") 
// }

// module.exports = {
//   hello
// }

// function updateChannel() {

// }

// function endChannel() {
//   channelsRef.off('value')
//