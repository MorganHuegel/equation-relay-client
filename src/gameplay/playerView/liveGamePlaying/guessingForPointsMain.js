import React from 'react';

export function GuessingForPointsMain (props) {
  let correctGuessCount = 0;
  const guessHeader = props.teamData.players.map(player => {
    if (player.correctGuess) {
      correctGuessCount++;
      return <p key={player._id}>{player.handle} - Correct</p>
    } else {
      return <p key={player._id}>{player.handle} - Incorrect</p>
    }
  });
  
  let groupAnswer = 0;
  for (let key in props.currentQuestion) {
    if (key.startsWith('equation')) {
      groupAnswer += Number(props.currentQuestion[key].answer);
    }
  }

  return (
    <div>
      {guessHeader}
      <p>Your individual answer was: {props.equationToDisplay.answer}</p>
      <p>The team answer was: {groupAnswer}</p>
      <p>You had {correctGuessCount} correct guesses!</p>
      <p>There will be {correctGuessCount} treasure boxes with positive points, 
      and {props.teamData.players.length - correctGuessCount} with negative points.</p>
      <button onClick={() => console.log('Guess For Points')}>Guess for points!</button>
    </div>
  )
}