import { useContext, useEffect, useState } from 'react';
import { WSContext as WSContextProvider } from '../../App';

const WSCommunication = () => {
  const WSContext = useContext(WSContextProvider);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('WSCommunication => Unmounted');
  }, []);

  return (
    <>
      <h2>WS</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        style={{ marginRight: '0.5em' }}
      />
      <button
        onClick={() => {
          WSContext.WSConnection.send(input);
          setInput('');
        }}
      >
        Send message
      </button>
      <ul>
        {Array.isArray(WSContext.WSMessages) &&
          WSContext.WSMessages.map((el, idx) => <li key={idx}>{el}</li>)}
      </ul>
    </>
  );
};

export default WSCommunication;
