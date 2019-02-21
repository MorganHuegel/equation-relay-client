import React from 'react';

export function PlayerJoinedAndWaiting (props) {
  return (
    <div>
      <h2>Welcome {props.handle}</h2>
      <p>Tell your classmates to hurry up!</p>
    </div>
  )
}