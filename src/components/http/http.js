import axios from 'axios';
import { useState, useEffect } from 'react';

const HTTPCommunication = () => {
  const [randomNumber, setRandomNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/random').then(
      (res) => {
        console.log('res: ', res);
        res.data.randomNumber && setRandomNumber(res.data.randomNumber);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      console.log('HTTPCommunication => Unmounted');
    };
  }, []);

  return (
    <>
      {randomNumber ? (
        <h2>
          HTTP <br />
          Random number retrieved from local express server <br /> <b>{randomNumber}</b>
        </h2>
      ) : (
        'Something went wrong.'
      )}
    </>
  );
};

export default HTTPCommunication;
