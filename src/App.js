import { createContext, useEffect, useState } from 'react';
import Navigation from './components/navigation/navigation';
import Router from './components/router/router';
import socketIOClient from 'socket.io-client';
import './App.css';

const WSConnection = new WebSocket('ws://localhost:4001');
const socket = socketIOClient.connect('http://localhost:4001');
let peerConnection;
const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

export const WSContext = createContext({
  WSConnection: null,
  WSConnectionEstablished: false,
  WSMessages: [],
});

export const WebRTCContext = createContext({
  peerConnection,
  config,
  socket,
});

socket.on('candidate', (id, candidate) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.error(e));
});

socket.on('connect', () => {
  socket.emit('watcher');
});

socket.on('broadcaster', () => {
  socket.emit('watcher');
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
