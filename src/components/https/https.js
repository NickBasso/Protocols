import axios from 'axios';
import { useState, useEffect } from 'react';

const HTTPSCommunication = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(
      (res) => {
        console.log('res: ', res);
        res.data && setUsers(res.data);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      console.log('HTTPSCommunication => Unmounted');
    };
  }, []);

  return (
    <>
      <h2>HTTPS</h2>
      Users:
      <br />
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{JSON.stringify(user)}</li>
          ))}
        </ul>
      ) : (
        'Something went wrong.'
      )}
    </>
  );
};

export default HTTPSCommunication;
