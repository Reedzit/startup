import React from 'react';
import './workoutbegins.css';

export function WorkoutBegins() {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect (() => {
    setImageUrl('/cards/kingspades.png');
  }, []);

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <h1 className="container-fluid text-center text-secondary mt-2">Destroy the Deck of Death</h1>
      {/* <div>Will implement 3rd party service to generate images of the cards to match the theme like this.</div> */}
      <div className="d-flex align-items-center justify-content-center">
        <img className="img-fluid" src={imageUrl} alt="kingspades" width="500px" />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-secondary text-center mt-3 mb-3">13 Pushups</h2>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <button className="btn btn-light mx-2 mb-3" type="button">Previous</button>
          <button className="btn btn-light mx-2 mb-3" type="button">Next</button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <h2 className="text-secondary text-center">Stop Watch</h2>
        <div className="d-flex flex-row justify-content-center align-items-center text-secondary" id="time">
          <div className="me-2" id="hr">00</div>
          <div className="col me-2">Hr</div>
          <div className="col me-1" id="min">00</div>
          <div className="col me-2">Min</div>
          <div className="col me-1" id="sec">00</div>
          <div className="col me-2">Sec</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center" id="buttons">
          <button className="btn btn-light my-4 mx-2" id="start">Start</button>
          <button className="btn btn-light my-4 mx-2" id="stop">Stop</button>
        </div>
      </div>
      <div className="d-block text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div className="mb-2">Billy has just began a workout!</div>
      </div>
    </main>
  );
}