import React from 'react';
import './history.css';

export function History() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [workoutHistory, setWorkoutHistory] = React.useState([]);

  React.useEffect (() => {
    setImageUrl('/images/grimReaperReading.png');
    const storedWorkouts = JSON.parse(localStorage.getItem('workoutHistory')) || [];  
    setWorkoutHistory(storedWorkouts);
  }, []);
  return (
    <main className="container-fluid flex-grow-1 bg-dark text-secondary">
      <h1 className="container-fluid text-center mt-2 mb-2">Review Your Decks of Death</h1>
      <div className="d-flex justify-content-center align-items-center">
        <img className="img-fluid" src={imageUrl} alt="Grim Reaper Reading" width="500" height="500" />
      </div>
      <h2 className="text-center mt-2 mb-2">Workout History</h2>
      <table className="table table-dark table-striped table-bordered mb-4 mt-2">
        <thead>
          <tr className="text-secondary">
            <th scope="col">Workout Combination</th>
            <th scope="col">Time (minutes)</th>
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
      <div className="d-flex text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div className="mb-2">Billy has just began a workout!</div>
      </div>
    </main>
  );
}