import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './login.css';

export function Authenticated(props) {
  const [imageUrl, setImageUrl] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    setImageUrl('/images/grimReaper.jpg');
  }, []);

  async function logout() {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: 'delete',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ userName: props.userName }),
      });

      if (response.ok) {
        localStorage.removeItem('userName');
        props.onLogout();
        navigate('/');
      } else {
        const body = await response.json();
        console.error(`⚠ Error: ${body.msg}`);
      }
    } catch (error) {
      console.error(`⚠ Error: ${error.message}`);
    }
  }

  return (
    <div className='bg-dark d-flex justify-content-center align-items-center'>
      <img className='mx-auto d-block' src={imageUrl} alt='Grim Reaper' height='300px' />
      <div className='name text-center text-light'>{props.userName} is logged in</div>
      <button className="btn btn-light mx-auto mt-4 mb-3" variant='primary' onClick={() => navigate('/newworkout')}>
        Workout
      </button>
      <button className="btn btn-light mx-auto mt-4 mb-3" variant='secondary' onClick={logout}>
        Logout
      </button>
    </div>
  );
}