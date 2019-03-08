import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/guessingForPointsAfter.css';

export function GuessingForPointsAfter (props) {  
  function handleClick () {
    props.socket.emit('nextQuestion', {
      teamId: props.teamData._id, 
      playerId: props.currentUser._id
    });
    props.setToLoading();
  }

  const positiveOrNegative = props.pointDifference > 0 ? 'positive' : 'negative';

  if (props.teamData.players[0]._id === props.currentUser._id) {
    return (
      <div className={'guessing-for-points-after ' + positiveOrNegative}>
        <h3>{props.pointDifference} points!</h3>
        <button id='next-question-button' onClick={handleClick}>Continue</button>
      </div>
    )
  } else {
    return (
      <div className={'guessing-for-points-after ' + positiveOrNegative}>
        <h3>{props.pointDifference} points!</h3>
        <p>Tell {props.teamData.players[0].handle} to click continue...</p>
      </div>
    )
  }
}