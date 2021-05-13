// Components
import Header from './components/Header/'
import Aside from './components/Aside/'
import Chat from './components/ChatContainer/'

import { AppContainer } from 'styled';
import { useEffect, useState } from 'react';

import socketClient from "socket.io-client";
const SERVER = "http://127.0.0.1:8080";

function App() {
  const [ contextData, setContextData ] = useState({
    channels: null,
    socket: null,
    channel: null
  })

  useEffect(() => {
    // TODO
    loadChannels();
    configureSocket();
  })

  configureSocket =  () => {
    var socket = socketClient(SERVER);
    socket.on('connection', () => {
      if (contextData.channel) {
          handleChannelSelect(contextData.channel.id);
      }
    });
  }

  loadChannels = async () => {
    fetch('http://localhost:8080/getChannels').then(async response => {
      let data = await response.json();
      this.setState({ channels: data.channels });
    })
  }

  handleChannelSelect = id => {
    let channel = contextData.channels.find(channel => {
        return channel.id === id;
    });
    this.setState({ channel });
    this.socket.emit('channel-join', id, ack => {
    });
  }

  handleSendMessage = (channel_id, text) => {
    this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
  }

  return (
    <AppContainer>

      <Header/>

      <div className="container">
        <Aside channels={  } onSelectChannel={ handleChannelSelect }/>
        <Chat onSendMessage={handleSendMessage} channel={contextData.channel}/>
      </div>
      
    </AppContainer>
  );
}

export default App;
