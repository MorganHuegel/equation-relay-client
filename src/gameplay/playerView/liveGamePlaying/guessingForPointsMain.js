import React from 'react';

import { GuessingForPointsBefore } from './guessingForPointsBefore';
import { GuessingForPointsGuess } from './guessingForPointsGuess';
import { GuessingForPointsWatch } from './guessingForPointsWatch';
import { GuessingForPointsAfter } from './guessingForPointsAfter';

export function GuessingForPointsMain (props) {
  if (props.pointDifference) {
    return <GuessingForPointsAfter {...props}/>
  }

  if (props.teamData.players.some(player => player.guessingForPoints) && props.currentUser.guessingForPoints) {
    return <GuessingForPointsGuess {...props}/>
  } else if (props.teamData.players.some(player => player.guessingForPoints)) {
    return <GuessingForPointsWatch {...props}/>
  } else {
    return <GuessingForPointsBefore {...props}/>
  }
}