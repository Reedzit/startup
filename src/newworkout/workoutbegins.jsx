import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './workoutbegins.css';

const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];


function getNumber(card) {
  if (card.value === 'jack') return 11;
  if (card.value === 'queen') return 12;
  if (card.value === 'king') return 13;
  if (card.value === 'ace') return 15;
  return parseInt(card.value);
}

function getWorkout(workout, currentCard) {
  if (currentCard.suit === 'hearts') return workout.heartExercise;
  if (currentCard.suit === 'clubs') return workout.clubExercise;
  if (currentCard.suit === 'diamonds') return workout.diamondExercise;
  if (currentCard.suit === 'spades') return workout.spadeExercise;
  else return 'No workout data';
}


function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function WorkoutBegins() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [deck, setDeck] = React.useState([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);
  const location = useLocation();
  const workout = location.state?.workout;

  React.useEffect (() => {
    const newDeck = shuffleDeck(createDeck());
    setDeck(newDeck);
  }, []);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % deck.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + deck.length) % deck.length);
  }

  const currentCard = deck[currentCardIndex];

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <h1 className="container-fluid text-center text-secondary mt-2">Destroy the Deck of Death</h1>
      {/* <div>Will implement 3rd party service to generate images of the cards to match the theme like this.</div> */}
      <div className="d-flex align-items-center justify-content-center">
        <img className="img-fluid" src={`/cards/${currentCard?.value}${currentCard?.suit}.png`} alt={`${currentCard?.value} of ${currentCard?.suit}`} width="500px" />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-secondary text-center mt-3 mb-3">{currentCard ? getNumber(currentCard) : 'Loading...'} {currentCard && workout ? `${getWorkout(workout, currentCard)}`: 'No workout data'}</h2>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <button className="btn btn-light mx-2 mb-3" type="button" onClick={handlePrevious}>Previous</button>
          <button className="btn btn-light mx-2 mb-3" type="button" onClick={handleNext}>Next</button>
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