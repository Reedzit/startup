import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({ userName, authState, onAuthChange }) {
  const [imageUrl, setImageUrl] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/newworkout');
  }
  const handleCreate = () => {
    navigate('/newworkout');
  }

  React.useEffect (() => {
    setImageUrl('/images/grimReaper.jpg');
  }, []);

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <div>
        {authState === AuthState.Authenticated && <h1 className="text-center text-secondary mt-4">Conquer the Deck of Death</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
          // <Authenticated userName={userName} onAuthChange={onAuthChange} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
      
      
    </main>
  );
}