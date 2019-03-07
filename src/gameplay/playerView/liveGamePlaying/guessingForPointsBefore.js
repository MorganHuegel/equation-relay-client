import React from 'react';

export function GuessingForPointsBefore (props) {
  let correctGuessCount = 0;
  const guessHeader = props.teamData.players.map(player => {
    if (player.correctGuess) {
      correctGuessCount++;
      return <p key={player._id}>{player.handle} - Correct</p>
    } else {
      return <p key={player._id}>{player.handle} - Incorrect</p>
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
    <div>
      {guessHeader}
      <p>Your equation was: {props.equationToDisplay.equation}</p>
      <p>Your individual answer was: {props.equationToDisplay.answer}</p>
      <p>The team answer was: {groupAnswer}</p>
      <p>You had {correctGuessCount} correct {correctGuessCount === 1 ? 'guess' : 'guesses'}!</p>
      <p>There will be {correctGuessCount} treasure {correctGuessCount === 1 ? 'box' : 'boxes'} with positive points, 
      and {props.teamData.players.length - correctGuessCount} with negative points.</p>
      <button onClick={() => props.socket.emit('assignGuesser', props.teamData._id)}>Guess for points!</button>
    </div>
  )
}