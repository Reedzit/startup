import React, { useEffect, useState } from 'react';
import './history.css';

export function History({ userName }) {
  const [imageUrl, setImageUrl] = useState('');
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    setImageUrl('/images/grimReaperReading.png');
    const fetchWorkoutHistory = async () => {
      try {
        const response = await fetch(`api/workouts/${userName}`);
        if (response.ok) {
          const data = await response.json();
          setWorkoutHistory(data);
        } else {
          console.error('Failed to fetch workout history');
        }
      } catch (error) {
        console.error('Error fetching workout history:', error);
      }
    };

    fetchWorkoutHistory();
  }, [userName]);

  return (
    <main className="container-fluid flex-grow-1 bg-dark text-secondary">
      <h1 className="text-center mt-2 mb-2">Review Your Decks of Death</h1>
      <div className="d-flex justify-content-center align-items-center">
        <img className="img-fluid" src={imageUrl} alt="Grim Reaper Reading" width="500" height="500" />
      </div>
      <h2 className="text-center mt-2 mb-2">Workout History</h2>
      <table className="table table-dark table-striped table-bordered mb-4 mt-2">
        <thead>
          <tr className="text-secondary">
            <th scope="col">Workout Combination</th>
            <th scope="col">Time (minutes:seconds)</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {workoutHistory.map((workout, index) => (
            <tr key={index}>
              <td className="text-secondary">{`${workout.heartExercise}, ${workout.clubExercise}, ${workout.diamondExercise}, ${workout.spadeExercise}`}</td>
              <td className="text-secondary">{workout.time}</td>
              <td className="text-secondary">{workout.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}