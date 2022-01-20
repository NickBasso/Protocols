import { Route, Routes } from 'react-router-dom';
import HTTPCommunication from '../http/http';
import HTTPSCommunication from '../https/https';
import WSCommunication from '../websockets/websockets';
import WebRTCCommunication from '../webRTC/webRTC';

function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<></>} />
      <Route exact path="/http" element={<HTTPCommunication />} />
      <Route exact path="/https" element={<HTTPSCommunication />} />
      <Route exact path="/ws" element={<WSCommunication />} />
      <Route exact path="/webrtc" element={<WebRTCCommunication />} />
    </Routes>
  );
}

export default Router;
