import React from 'react';

export function GuessingForPointsWatch (props) {
  const playerGuessing = props.teamData.players.find(player => player.guessingForPoints);

  return (
    <div>
      <h3>{playerGuessing.handle} is guessing for points!</h3>
      <p>Currently: {props.teamData.points} points</p>
    </div>
  )
}