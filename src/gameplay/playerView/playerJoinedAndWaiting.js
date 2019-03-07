import React from 'react';

import '../../stylesheets/gameplay/playerView/playerJoinedAndWaiting.css';

export function PlayerJoinedAndWaiting (props) {
  return (
    <div className='player-joined-and-waiting'>
      <h2>Welcome, <span>{props.handle}</span>!</h2>
      <p>Tell your classmates to hurry up!</p>
    </div>
  )
}