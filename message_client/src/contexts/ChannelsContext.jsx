import { createContext, useState, useEffect } from "react";
import socketClient from "socket.io-client";

const SERVER = "http://172.168.1.88:4001";

export const ChannelContext = createContext({})

export function ChannleContextProvider(props) {
  const [ channels, setChannels ] = useState()
  const [ socket, setSocket ] = useState()
  const [ channel, setChannel ] = useState()

  function configureSocket() {
    setSocket(socketClient(SERVER));
  }

  const loadChannels = async () => {
    const { channels } = await fetch(`${SERVER}/getChannels`)
      .then(response => response.json()).catch(console.log("Erro"))

    return channels;
  }

  // builder
  useEffect(() => {
    loadChannels().then(
      response => {
        setChannels(response)
        configureSocket();
      }
    )
  }, [] )

  // socket listener
  useEffect( () => {
    if(socket!=null){
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

  useEffect(()=>{ 
    if(channel?.id != undefined) {
      handleChannelSelection(channel.id)
    }
  }, [ channels ])

  const handleChannelSelection = id => {
    // TODO
      // validation if current channel

    let channel = channels.find( channel => {
        return channel.id === id;
    });
    // console.log(channel)
    setChannel(channel)
    socket.emit('channel-join', id);
  }

  const handleSendMessage = (channel_id, text) => {
    socket.emit('send-message', { channel_id, text, senderId: socket.id, id: Date.now() });
  }

  return (
    <ChannelContext.Provider 
      value={
        {channel, setChannel,
        channels, setChannels,
        socket, setSocket,
        handleChannelSelection, handleSendMessage}
      }
    >
      { props.children }
    </ChannelContext.Provider>
  )
}