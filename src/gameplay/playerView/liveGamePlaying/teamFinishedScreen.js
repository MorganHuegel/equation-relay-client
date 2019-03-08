import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/teamFinishedScreen.css';

export function TeamFinishedScreen (props) {
  return (
    <div className='team-finished-screen'>
      <h2>Finished!</h2>
      <p>Final Score: {props.teamData.points} points</p>
    </div>
  )
}