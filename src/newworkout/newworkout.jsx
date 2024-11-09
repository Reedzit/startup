import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './newworkout.css';
import Workout from './workout';

export function Newworkout({userName}) {
  const [imageUrl, setImageUrl] = useState('');
  const [heartExercise, setHeartExercise] = useState('');
  const [clubExercise, setClubExercise] = useState('');
  const [diamondExercise, setDiamondExercise] = useState('');
  const [spadeExercise, setSpadeExercise] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setImageUrl('/images/grimReaperPushUps.jpg');
  }, []);

  const handleBeginClick = () => {
    const workout = new Workout(heartExercise, clubExercise, diamondExercise, spadeExercise);
    console.log(workout); // You can use this object as needed
    const existingWorkouts = JSON.parse(localStorage.getItem(`workoutHistory_${userName}`)) || [];
    const updatedWorkouts = [...existingWorkouts, workout];
    localStorage.setItem(`workoutHistory_${userName}`, JSON.stringify(updatedWorkouts));

    navigate('/workoutbegins', { state: {workout}});
  };

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <div className="">
        <h1 className="text-center text-secondary mt-4 mb-4">Begin the Deck of Death</h1>
        <img className="mx-auto d-block" src={imageUrl} alt="Grim Reaper Push Ups" width="400" height="400" />
        <h2 className="text-secondary text-center mt-4 mb-4">Choose Workout For Each Suit</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center text-center text-secondary">
        <div className="">
          Workout 1 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Hearts" value={heartExercise} onChange={(e) => setHeartExercise(e.target.value)} />
        </div>
        <div>
          Workout 2 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Clubs" value={clubExercise} onChange={(e) => setClubExercise(e.target.value)} />
        </div>
        <div>
          Workout 3 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Diamonds" value={diamondExercise} onChange={(e) => setDiamondExercise(e.target.value)} />
        </div>
        <div>
          Workout 4 <input className="bg-light m-1 form-control rounded" type="text" placeholder="Spades" value={spadeExercise} onChange={(e) => setSpadeExercise(e.target.value)} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-light mt-4 mb-3" type="button" onClick={handleBeginClick}>Begin</button>
      </div>
      <div className="d-flex text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div className="mb-2">Billy has just began a workout!</div>
      </div>
    </main>
  );
}