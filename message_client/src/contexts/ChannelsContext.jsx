import { createContext, useState, useEffect } from "react";
import socketClient from "socket.io-client";

import { database } from '../services/firabase'

// const SERVER = "http://172.168.1.88:4001";
const SERVER = "http://localhost:4001";

export const ChannelContext = createContext({})

export function ChannelContextProvider(props) {
  const [ channels, setChannels ] = useState()
  const [ socket, setSocket ] = useState()
  const [ channel, setChannel ] = useState()

  function configureSocket() {
    setSocket(socketClient(SERVER));
  }

  useEffect(() => {
    configureSocket();

    const channelsRef = database.ref('channels')
    channelsRef.on('value', channel => {
      const databaseChannels = channel.val();
      
      let parsedChannels = Object.entries( databaseChannels )
        .map( channel => { 
          return {
            id : channel[0], 
            ...channel[1]
          }
        }
      )
      parsedChannels.forEach( channel => {
        channel.sockets = parseClientsList(channel.sockets)
      } )

      setChannels(parsedChannels)

    })
    
    // END LISTENER
    return () => {
      leaveChannel()
      channelsRef.off('value')
    }

  }, [])


  const parseClientsList = (clientsObj) => clientsObj && Object.values(clientsObj)
  
  // socket listener
  useEffect( () => {
    if(socket){
      socket.on('connection', () => {
        if (channel) {
            handleChannelSelection(channel.id);
        }
      });

    // TODO
      socket.on('channel', channels => {     
        console.log("AUX CHANNEL IT IS " + channels)
        setChannels(channels)
        
      // Message
        socket.on('message', channels => {
          setChannels(channels)
          
          console.log("on message", channels)
        });

        // setChannels(channels)

      })
      setChannels(channels)
    }
  }, [socket] )

  async function handleChannelSelection(channelId) {
    let channel = channels.find( channel => {
        return channel.id === channelId;
    });
    
    setChannel(channel)

    pushSocket(channelId)
    leaveChannel()

    socket.emit('channel-join', channelId);
  }

  async function pushSocket(channelId) {
    const channelSocketsRef = await database.ref(`channels/${channelId}/sockets`)

    let sockets = await channelSocketsRef.get()
      .then(res => parseClientsList(res.val()))
    console.log(sockets)

    if(!sockets || (sockets.indexOf(socket.id) == (-1)))
      await channelSocketsRef.push(socket.id)
    else
      return
  }

  async function leaveChannel() {
    if( channel != undefined ){
      const oldChannelSockets = await database.ref(`channels/${channel.id}`).get()
        .then(res => res.val().sockets);
      
      if(oldChannelSockets){
        let socketKey = Object.keys(oldChannelSockets)
          .find( key => oldChannelSockets[key] == socket.id  )
        
        await database.ref(`channels/${channel.id}/sockets/${socketKey}`).remove();
      }
    }
  }

  async function handleSendMessage(text){
    const channelRef = await database.ref(`channels/${channel.id}/messages`).push({
      text, senderId: socket.id
    })
    // socket.emit('send-message', { channel_id, text, senderId: socket.id, id: Date.now() });
  }

  return (
    <ChannelContext.Provider 
      value={
        {channel, setChannel,
        channels, setChannels,
        socket, setSocket,
        handleChannelSelection, handleSendMessage, leaveChannel}
      }
    >
      { props.children }
    </ChannelContext.Provider>
  )
}