import { useContext, useEffect, useState } from 'react';
import { WSContext as WSContextProvider } from '../../App';

const WSCommunication = ({ WSConnection, WSConnectionEstablished }) => {
  const WSContext = useContext(WSContextProvider);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('WS Messages: ', WSContext.WSMessages);

    // if (WSContext.WSConnectionEstablished === true) {
    //   console.log('On mount send message.');
    //   WSContext.WSConnection.send("Here's some text that the server is urgently awaiting!");
    // }

    return () => {
      console.log('WSCommunication => Unmounted');
    };

    console.log(WSContext.WSMessages);
  }, [WSContext]);

  useEffect(() => {
    console.log('input = ', input);
  }, [input]);

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
