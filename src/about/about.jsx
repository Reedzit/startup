import React from 'react';

export function About() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [aboutInfo, setAboutInfo] = React.useState('Loading...');
  
  React.useEffect(() => {
    setImageUrl('/images/grimReaperQuestioningLife.png');
    setAboutInfo('The deck of death is a convenient yet difficult workout. You start with a deck of cards where you assign a workout to each suit, perform the number of repetitions specified on the card, and then proceed to the next card. The goal is to complete all 52 cards as quickly as you can. This website will allow you to complete a workout, save your workout, and share your workout with friends.');
  });

  return(
    <main className="container-fluid flex-grow-1 bg-dark text-secondary">
        <h1 className="text-center mt-2">Why Conquer the Deck of Death?</h1>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <img src={imageUrl} alt="Grim Reaper Questioning Life" width="300" height="300" />
        </div>
        <div className="text-center mt-4 mb-4">
          {aboutInfo}
        </div>
        <div className="d-flex text-secondary">
          <h3 className="align-self-start">Notifications</h3>
          <div className="mb-2">Billy has just began a workout!</div>
        </div>
    </main>
  );
}