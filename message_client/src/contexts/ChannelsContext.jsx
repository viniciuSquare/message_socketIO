import { createContext, useState, useEffect } from "react";
import socketClient from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const SERVER = "http://172.168.1.88:4001";
// const SERVER = "http://192.168.0.102:4001";

export const ChannelContext = createContext({})

export function ChannelContextProvider(props) {
  const [ channels, setChannels ] = useState()
  const [ socket, setSocket ] = useState()
  const [ channel, setChannel ] = useState()

  const {user} = useAuth()

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

      socket.on("channels-update", channels => {
        if (channel) {
          handleChannelSelection(channel.id);
        }
        setChannels(channels)
      })
    
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
    socket.emit('channel-creation', channelName, "", (createdChannelId) => { 
      /* GET CREATED CHANNEL DATA */ 
      handleChannelSelection(createdChannelId)
    })
  }

  function handleSendMessage(text){
    socket.emit('send-message', { 
        channelId: channel.id,
        text, 
        sender: user.name | socket.id, 
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