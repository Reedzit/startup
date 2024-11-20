import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState(props.email || "");
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ userName: userName, email: email, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  React.useEffect (() => {
    setImageUrl('/images/grimReaper.jpg');
  }, []);

  return (
    <>
      <img className="mx-auto mt-4 d-block" src= {imageUrl} alt="Grim Reaper" height="300px" />

        <h2 className="text-secondary text-center m-2">Login to Begin</h2>
        <div className="d-flex flex-column align-items-center">
          <div>
            <input 
            className="bg-light m-2 form-control rounded" 
            type="text" 
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <input 
            className="bg-light m-2 form-control rounded" 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input 
            className="bg-light m-2 form-control rounded" 
            type="password" 
            placeholder="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-light mx-auto my-2 w-auto" type="submit" onClick={() => loginUser()} disabled={!userName || !password}>Login</button>
          <button className="btn btn-light mx-auto my-2 w-auto" type="create" onClick={() => createUser()} disabled={!userName || !password}>Create</button>
        </div>
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
