import React from 'react';
import { useNavigate } from 'react-router-dom';
import './newworkout.css';

export function Newworkout() {
  const [imageUrl, setImageUrl] = React.useState('');
  const navigate = useNavigate();

  React.useEffect (() => {
    setImageUrl('/images/grimReaperPushUps.jpg');
  }, []);

  const handleBeginClick = () => {
    navigate('/workoutbegins');
  };

  return(
    <main className="container-fluid flex-grow-1 bg-dark">
      <div className="">
        <h1 className="text-center text-secondary mt-4 mb-4">Begin the Deck of Death</h1>
        <img className="mx-auto d-block" src={imageUrl} alt="Grim Reaper Push Ups" width="400" height="400" />
        <h2 className="text-secondary text-center mt-4 mb-4">Choose Workout For Each Suit</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center text-center text-secondary">
        <div className="">
          Workout 1 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Hearts" />
        </div>
        <div>
          Workout 2 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Clubs" />
        </div>
        <div>
          Workout 3 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Diamonds" />
        </div>
        <div>
          Workout 4 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Spades" />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-light mt-4 mb-3" type="generateworkout">Generate Workout</button>
        <button className="btn btn-light mt-2 mb-4" type="button" onClick={handleBeginClick}>Begin</button>
      </div>
      <div className="d-flex text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div className="mb-2">Billy has just began a workout!</div>
      </div>
    </main>
  );
}