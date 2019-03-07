import React from 'react';

export function HeaderSubmissionList (props) {
  const playersList = props.teamData.players.map(player => {
    const key = player._id;
    if (player.alreadyGuessed) {
      return <li key={key}>{player.handle}</li>
    } else {
      return <li key={key}>{player.handle} 
        <span>(not submitted)</span>
        <button onClick={() => props.skipPlayer(player._id)}>{"<--"} Skip them</button>
      </li>
    }
  });

  return (
    <div>
      <h3>{props.teamData.teamName}</h3>
      <ul>
        {playersList}
      </ul>
      <p>Current Score: {props.teamData.points}</p>
    </div>
  )
}