// Components
import Header from './components/Header/'
import Aside from './components/Aside/'
import Chat from './components/ChatContainer/'

import { AppContainer } from 'styled';
import { useEffect, useState } from 'react';

import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:4001";

function App() {
  const [ channels, setChannels ] = useState(null)
  const [ socket, setSocket ] = useState(null)
  const [ channel, setChannel ] = useState(null)

  function configureSocket() {
    setSocket(socketClient(SERVER));
  }
  
  const loadChannels = async () => {
    const { channels } = await fetch('http://localhost:4001/getChannels')
      .then(response => response.json())

    return channels;
  }
  // builder
  useEffect(() => {
    configureSocket();
    loadChannels().then(
      response => {
        setChannels(response)
      }
    )
  }, [] )

  // useEffect(() => { console.log(channels) } , [channels])

  // socket listener
  useEffect( () => {
      if(socket!=null){
        socket.on('connection', () => {
          if (channel) {
              handleChannelSelect(channel.id);
          }
        });

      // TODO
        socket.on('channel', channels => {     
          console.log("AUX CHANNEL IT IS " + channels)
          setChannels(channels)
          
        // Message
          socket.on('message', message => {
            channels.forEach(channel => {
              if (channel.id === message.channel_id) {
                if (!channel.messages) {
                  channel.messages = [message];
                  setChannel(channel)

                } else {
                  channel.messages.push(message);
                  setChannel(channel)

                }
              }
            });
        });

          setChannels(channels)

        })
        setChannels(channels)
      }
  }, [socket] )
  
  const handleChannelSelect = id => {
    // TODO
      // validation if current channel

    let channel = channels.find(channel => {
        return channel.id === id;
    });
    // console.log(channel)
    setChannel(channel)
    socket.emit('channel-join', id);
  }

  const handleSendMessage = (channel_id, text) => {
    socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
  }

  return (
    <AppContainer>

      <Header/>

      <div className="container">
        <Aside className="channels" channels={ channels } onSelectChannel={ handleChannelSelect }/>
        <Chat className="chat" onSendMessage={handleSendMessage} channel={channel}/>
      </div>
      
    </AppContainer>
  );
}

export default App;
