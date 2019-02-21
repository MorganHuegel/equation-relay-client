import React from 'react';

export function LiveGameReadyScreen (props) { 
  const teamList = props.currentTeam.players.map( (player, index) => {
    return (
      <ol key={player._id}>
        <li>Player {index + 1} - {player.handle}</li>
      </ol>
    )
  })
  return (
    <div>
      {teamList}
      <p>Current Score: {props.currentTeam.points}</p>
      <p>{props.currentTeam.teamName}, ready your pencils!</p>
    </div>
  )
}