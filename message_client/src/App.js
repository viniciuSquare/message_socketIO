// Components
import Header from './components/Header/'
import Aside from './components/Aside/'
import Chat from './components/ChatContainer/'

import { AppContainer } from 'styled';

import { ChannleContextProvider } from 'contexts/ChannelsContext';

function App() {
  // useEffect(() => { console.log(channels) } , [channels])

  return (
    <ChannleContextProvider>
      <AppContainer>
        <Header/>

        <div className="container">
          <Aside className="channels" />
          <Chat className="chat" />
        </div>
        
      </AppContainer>
    </ChannleContextProvider>
  );
}

export default App;
