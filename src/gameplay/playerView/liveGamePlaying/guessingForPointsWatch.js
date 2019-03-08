import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/guessingForPointsWatch.css';

export function GuessingForPointsWatch (props) {
  const playerGuessing = props.teamData.players.find(player => player.guessingForPoints);

  return (
    <div className='guessing-for-points-watch'>
      <h2>{playerGuessing.handle} is guessing for points! Cheer them on!</h2>
      <p>Currently: {props.teamData.points} points</p>
    </div>
  )
}