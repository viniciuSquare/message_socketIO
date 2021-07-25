// Components
import Header from './components/Header/'
import Aside from './components/Aside/'
import Chat from './components/ChatContainer/'

import { AppContainer } from './styled';

import { ChannelContextProvider } from './contexts/ChannelsContext';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  // useEffect(() => { console.log(channels) } , [channels])

  return (
    <ChannelContextProvider>
      <AuthContextProvider>
        <AppContainer>
          
          <Header/>
          <div className="container">
            <Aside className="channels" />
            <Chat className="chat" />
          </div>
          
        </AppContainer>
      </AuthContextProvider>
    </ChannelContextProvider>
  );
}

export default App;
