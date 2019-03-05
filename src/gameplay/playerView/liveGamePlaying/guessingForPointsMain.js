import React from 'react';

import { GuessingForPointsBefore } from './guessingForPointsBefore';
import { GuessingForPointsGuess } from './guessingForPointsGuess';
import { GuessingForPointsWatch } from './guessingForPointsWatch';

export function GuessingForPointsMain (props) {
  if (props.pointDifference) {
    return (
      <div>
        <h3>{props.pointDifference} points!</h3>
        <button onClick={() => console.log('CONTINUE')}>Continue</button>
      </div>
    )
  }

  if (props.teamData.players.some(player => player.guessingForPoints) && props.currentUser.guessingForPoints) {
    return <GuessingForPointsGuess {...props}/>
  } else if (props.teamData.players.some(player => player.guessingForPoints)) {
    return <GuessingForPointsWatch {...props}/>
  } else {
    return <GuessingForPointsBefore {...props}/>
  }
}