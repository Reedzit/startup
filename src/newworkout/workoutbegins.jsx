import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './workoutbegins.css';
import { WorkoutEvent, WorkoutNotifier } from './workoutNotifier';


export function WorkoutBegins() {
  const [deckId, setDeckId] = useState('');
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [events, setEvent] = React.useState([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);

  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const workout = location.state?.workout;
  const userName = localStorage.getItem('userName');

  React.useEffect(() => {
    WorkoutNotifier.addHandler(handleWorkoutEvent);
    return () => {
      WorkoutNotifier.removeHandler(handleWorkoutEvent);
    };
  });

  function handleWorkoutEvent(event) {
    setEvent([...events, event]);
  }

  function createMessageArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      console.log("event: ", event);
      let message = ' finished workout';
      if (event.type === WorkoutEvent.Finish) {
        message = ` finished workout`;
      } else if (event.type === WorkoutEvent.Start) {
        message = ` started workout`;
      } else if (event.type === WorkoutEvent.System) {
        message = event.value.msg;
      }
      console.log("websocket message: ", message);
      messageArray.push(
        <div key={i} className='event'>
          <span className={'user-event'}>{event.from}</span>
          {message}
        </div>
      )
    }
    return messageArray;
  }

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        setDeckId(data.deck_id);
        drawCards(data.deck_id);
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    const drawCards = async (deckId) => {
      try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`);
        const data = await response.json();
        setDeck(data.cards);
      } catch (error) {
        console.error('Error drawing cards:', error);
      }
    };

    fetchDeck();
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % deck.length);
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + deck.length) % deck.length);
  };

  const handleFinishWorkout = async () => {
    try {
      const response = await fetch('api/workout/finish', {
        method: 'PUT',
        body: JSON.stringify({ userName: localStorage.getItem('userName'), workoutId: localStorage.getItem('currentWorkoutId'), time: `${minutes}:${seconds}` }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      WorkoutNotifier.broadcastEvent(userName, WorkoutEvent.End, {});
      if (response.ok) {
        localStorage.removeItem('currentWorkout');
        localStorage.removeItem('currentWorkoutId');
        navigate('/');
      } else {
        console.error('Failed to finish workout');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => {
      if (!prevIsRunning && !workoutStarted) {
        WorkoutNotifier.broadcastEvent(userName, WorkoutEvent.Start, {});
        setWorkoutStarted(true);
      }
      return !prevIsRunning;
    });
  };

  const getWorkout = (workout, card) => {
    const suit = card.suit.toLowerCase();
    const value = card.value.toLowerCase();
    let exercise;

    if (suit === 'hearts') {
      exercise = workout.heartExercise;
    } else if (suit === 'diamonds') {
      exercise = workout.diamondExercise;
    } else if (suit === 'clubs') {
      exercise = workout.clubExercise;
    } else if (suit === 'spades') {
      exercise = workout.spadeExercise;
    } else if (suit === 'joker') {
      return 'Joker';
    }

    const number = value === 'ace' ? 14 : value === 'king' ? 13 : value === 'queen' ? 12 : value === 'jack' ? 11 : parseInt(value);
    return `${number} ${exercise}`;
  };

  const currentCard = deck[currentCardIndex];

  return (
    <main className="container-fluid flex-grow-1 bg-dark">
      <h1 className="container-fluid text-center text-secondary mt-2">Destroy the Deck of Death</h1>
      <div className="d-flex align-items-center justify-content-center">
        {currentCard && (
          <img className="img-fluid" src={currentCard.image} alt={`${currentCard.value} of ${currentCard.suit}`} width="500px" />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-secondary text-center mt-3 mb-3">
          {currentCard ? `${currentCard.value} of ${currentCard.suit}` : 'Loading...'} {currentCard && workout ? `${getWorkout(workout, currentCard)}` : 'No workout data'}
        </h2>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <button className="btn btn-light mx-2 mb-3" type="button" onClick={handlePrevious}>Previous</button>
          <button className="btn btn-light mx-2 mb-3" type="button" onClick={handleNext}>Next</button>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <h2 className="text-secondary text-center">Stop Watch</h2>
        <div className="d-flex flex-row justify-content-center align-items-center text-secondary" id="time">
          <div className="me-2" id="min">{String(minutes).padStart(2, '0')}</div>
          <div className="col me-2">Min</div>
          <div className="col me-1" id="sec">{String(seconds).padStart(2, '0')}</div>
          <div className="col me-2">Sec</div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center" id="buttons">
          <button className="btn btn-light my-4 mx-2" id="start/stop" onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
          <button className="btn btn-light my-4 mx-2" id="finish" onClick={handleFinishWorkout}>Finish Workout</button>
        </div>
      </div>
      <div className="d-block text-secondary">
        <h3 className="align-self-start">Notifications</h3>
        <div id='workout-messages'className="mb-2">
          {createMessageArray()}
        </div>
      </div>
    </main>
  );
}