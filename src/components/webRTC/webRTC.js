import { useEffect, useState, useContext } from 'react';
import { WebRTCContext as WebRTCContextProvider } from '../../App';
import socketIOClient from 'socket.io-client';

const WebRTCCommunication = () => {
  const WebRTCContext = useContext(WebRTCContextProvider);
  const [isMuted, setIsMuted] = useState(true);
  const [srcObject, setSrcObject] = useState(null);

  useEffect(() => {
    console.log(WebRTCContext.socket);

    return () => {
      console.log('WebRTCCommunication => Unmounted');
    };
  }, []);

  WebRTCContext.socket.on('offer', (id, description) => {
    WebRTCContext.peerConnection = new RTCPeerConnection(WebRTCContext.config);
    WebRTCContext.peerConnection
      .setRemoteDescription(description)
      .then(() => WebRTCContext.peerConnection.createAnswer())
      .then((sdp) => WebRTCContext.peerConnection.setLocalDescription(sdp))
      .then(() => {
        WebRTCContext.socket.emit('answer', id, WebRTCContext.peerConnection.localDescription);
      });
    WebRTCContext.peerConnection.ontrack = (event) => {
      setSrcObject(event.streams[0]);
    };
    WebRTCContext.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        WebRTCContext.socket.emit('candidate', id, event.candidate);
      }
    };
  });

  // socket.on('candidate', (id, candidate) => {
  //   peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((e) => console.error(e));
  // });

  // socket.on('connect', () => {
  //   socket.emit('watcher');
  // });

  // socket.on('broadcaster', () => {
  //   socket.emit('watcher');
  // });

  return (
    <>
      <h2>WebRTC</h2>
      <video srcobject={srcObject} playsInline autoPlay muted={isMuted}></video>
      <br />
      <button
        id="enable-audio"
        onClick={() => {
          console.log('Enabling audio');
          setIsMuted(!isMuted);
        }}
      >
        {isMuted ? 'Enable audio' : 'Disable audio'}
      </button>
    </>
  );
};

export default WebRTCCommunication;
