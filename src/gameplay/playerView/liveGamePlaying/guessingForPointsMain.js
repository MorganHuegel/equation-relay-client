import React from 'react';

import { GuessingForPointsBefore } from './guessingForPointsBefore';

export function GuessingForPointsMain (props) {
  if (props.teamData.players.some(player => player.guessingForPoints)) {
    return <p>Guessing Component Goes Here</p>
  } else {
    return <GuessingForPointsBefore {...props}/>
  }
}