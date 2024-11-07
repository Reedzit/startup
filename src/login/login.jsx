import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
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
    setImageUrl('public/images/grimReaper.jpg');
  }, []);

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <h1 className="text-center text-secondary mt-4">Conquer the Deck of Death</h1>
      <img className="mx-auto d-block" src= {imageUrl} alt="Grim Reaper" height="300px" />
      <form onSubmit={handleLogin}>
        <h2 className="text-secondary text-center m-2">Login to Begin</h2>
        <div className="d-flex flex-column align-items-center">
          <div>
            <input className="bg-light m-2 form-control rounded" type="text" placeholder="first name" />
          </div>
          <div>
            <input className="bg-light m-2 form-control rounded" type="text" placeholder="last name" />
          </div>
          <div>
            <input className="bg-light m-2 form-control rounded" type="email" placeholder="your@email.com" />
          </div>
          <div>
            <input className="bg-light m-2 form-control rounded" type="password" placeholder="password" />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-light mx-auto my-2 w-auto" type="submit">Login</button>
          <button className="btn btn-light mx-auto my-2 w-auto" type="create" onClick={handleCreate}>Create</button>
        </div>
      </form>
    </main>
  );
}