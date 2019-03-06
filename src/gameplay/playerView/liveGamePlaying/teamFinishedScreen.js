import React from 'react';

export function TeamFinishedScreen (props) {
  return (
    <div>
      <h3>Finished!</h3>
      <p>Final Score: {props.teamData.points} points</p>
    </div>
  )
}