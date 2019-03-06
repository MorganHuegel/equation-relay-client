import React from 'react';

export function GuessingForPointsAfter (props) {
  return (
    <div>
      <h3>{props.pointDifference} points!</h3>
      <button onClick={() => {
        props.socket.emit('nextQuestion', {
          teamId: props.teamData._id, 
          playerId: props.currentUser._id
        });
        }}>Continue</button>
    </div>
  )
}