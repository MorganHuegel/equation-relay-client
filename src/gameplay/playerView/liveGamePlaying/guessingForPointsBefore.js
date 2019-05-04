import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/guessingForPointsBefore.css';

export function GuessingForPointsBefore (props) {
  let correctGuessCount = 0;
  const guessHeader = props.teamData.players.map(player => {
    if (player.correctGuess) {
      correctGuessCount++;
      return <li key={player._id} className='correct'>{player.handle} - Correct</li>
    } else {
      return <li key={player._id} className='incorrect'>{player.handle} - Incorrect</li>
    }
  });
  
  //Calcualte group answer
  let equations = [
    props.currentQuestion.equation1, 
    props.currentQuestion.equation2, 
    props.currentQuestion.equation3, 
    props.currentQuestion.equation4
  ];
  let groupAnswer = 0;
  props.teamData.players.forEach(player => {
    groupAnswer += Number(equations[player.assignedEquationIndex].answer);
  });
  

  return (
    <div className='guessing-for-points-before'>
      <ul className='team-member-correctness'>
        {guessHeader}
      </ul>
      <p>Your equation was: <span className='answer'>{props.equationToDisplay.equation}</span></p>
      <p>Your individual answer was: <span className='answer'>{props.equationToDisplay.answer}</span></p>
      <p>The team answer was: <span className='answer'>{groupAnswer}</span></p>
      <p>There will be {correctGuessCount} treasure {correctGuessCount === 1 ? 'box' : 'boxes'} with positive points, 
      and {props.teamData.players.length - correctGuessCount} with negative points.</p>
      <button onClick={() => props.socket.emit('assignGuesser', props.teamData._id)}>Guess for points!</button>
    </div>
  )
}