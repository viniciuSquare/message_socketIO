

import Header from './components/Header/'
import Aside from './components/Aside/'
import Chat from './components/ChatContainer/'
import { AppContainer } from 'styled';

function App() {
  return (
    <AppContainer>

      <Header/>

      <div className="container">
        <Aside />
        <Chat />
      </div>
      
    </AppContainer>
  );
}

export default App;
