import { Link } from 'react-router-dom';

const Navigation = () => (
  <>
    <Link to="/http">HTTP</Link>
    <br />
    <Link to="/https">HTTPS</Link>
    <br />
    <Link to="/ws">WS</Link>
    <br />
    <Link to="/webrtc">WebRTC</Link>
  </>
);

export default Navigation;
