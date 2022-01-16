import { Route, Routes } from 'react-router-dom';
import HTTPCommunication from '../http/http';
import HTTPSCommunication from '../https/https';
import WSCommunication from '../websockets/websockets';
import { WSContext } from '../../App';

function Router({ WSConnection, WSConnectionEstablished }) {
  return (
    <Routes>
      <Route exact path="/" element={<></>} />
      <Route exact path="/http" element={<HTTPCommunication />} />
      <Route exact path="/https" element={<HTTPSCommunication />} />
      <Route
        exact
        path="/ws"
        element={
          <WSCommunication
            WSConnection={WSConnection}
            WSConnectionEstablished={WSConnectionEstablished}
          />
        }
      />
    </Routes>
  );
}

export default Router;
