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
  }, [])
  
  // socket listener
  useEffect( () => {
    if(socket){
      socket.on('connection', (channels) => {
        if (channel) {
            handleChannelSelection(channel.id);
        }
        setChannels(channels)
      });
    
    // Message
      socket.on('new-message', channel => {
        setChannel(channel)
        
        console.log("on message", channel)
      });
    }
  }, [socket] )

  function handleChannelSelection(channelId) {
    socket.emit('channel-join', channelId, "", (joinedChannel) => {
      // console.log(joinedChannel)
      setChannel(joinedChannel)
    } )
  }

  function handleChannelCreation(channelName) {
    socket.emit('channel-creation', channelName, "", (createdChannel) => { 
      /* GET CREATED CHANNEL DATA */ 
      handleChannelSelection(createdChannel.id)
    })
  }

  function handleSendMessage(text){
    socket.emit('send-message', { 
        channelId: channel.id,
        text, 
        senderId: socket.id, 
        time: Date.now() 
      }, "_", (channelData) => {
        // console.log(channelData)
        setChannel(channelData)
      }
    );
  }

  return (
    <ChannelContext.Provider 
      value={
        {channel, setChannel,
        channels, setChannels,
        socket, setSocket,
        handleChannelSelection, handleSendMessage, handleChannelCreation}
      }
    >
      { props.children }
    </ChannelContext.Provider>
  )
}