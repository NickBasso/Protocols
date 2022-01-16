import { createContext, useEffect, useState } from 'react';
import Navigation from './components/navigation/navigation';
import Router from './components/router/router';
import './App.css';

const WSConnection = new WebSocket('ws://localhost:4001');
export const WSContext = createContext({
  WSConnection: null,
  WSConnectionEstablished: false,
  WSMessages: [],
});

function App() {
  const [WSConnectionEstablished, setWSConnectionEstablished] = useState(false);
  const [WSMessages, setWSMessages] = useState([]);

  WSConnection.onopen = function () {
    console.log('Established');
    console.log(WSConnection);
    setWSConnectionEstablished(true);
  };

  WSConnection.onmessage = function (event) {
    console.log('Message received: ', event.data);
    setWSMessages([...WSMessages, event.data]);
  };

  useEffect(() => {
    console.log('messages: ', WSMessages);
  });

  return (
    <div className="App">
      <WSContext.Provider
        value={{
          WSConnection: WSConnection,
          WSConnectionEstablished: WSConnectionEstablished,
          WSMessages: WSMessages,
        }}
      >
        <Navigation />
        <Router />
      </WSContext.Provider>
    </div>
  );
}

export default App;
