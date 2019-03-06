import React from 'react';

export function GuessingForPointsAfter (props) {  
  function handleClick () {
    props.socket.emit('nextQuestion', {
      teamId: props.teamData._id, 
      playerId: props.currentUser._id
    });
    props.setToLoading();
  }


  if (props.teamData.players[0]._id === props.currentUser._id) {
    return (
      <div>
        <h3>{props.pointDifference} points!</h3>
        <button id='next-question-button' onClick={handleClick}>Continue</button>
      </div>
    )
  } else {
    return (
      <div>
        <h3>{props.pointDifference} points!</h3>
        <p>Tell {props.teamData.players[0].handle} to click continue...</p>
      </div>
    )
  }
}