import React from 'react';
import './history.css';

export function History() {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect (() => {
    setImageUrl('public/images/grimReaperReading.png');
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
          <tr>
            <td className="text-secondary">Workout 1</td>
            <td className="text-secondary">2020</td>
            <td className="text-secondary">09/27/2024</td>
          </tr>
          <tr>
            <td className="text-secondary">Workout 2</td>
            <td className="text-secondary">200</td>
            <td className="text-secondary">09/01/2024</td>
          </tr>
          <tr>
            <td className="text-secondary">Workout 3</td>
            <td className="text-secondary">3456</td>
            <td className="text-secondary">04/27/2024</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div className="mb-2">Billy has just began a workout!</div>
      </div>
    </main>
  );
}