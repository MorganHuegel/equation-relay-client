import React from 'react';

import '../../stylesheets/gameplay/playerView/liveGameReadyScreen.css';

export function LiveGameReadyScreen (props) { 
  const teamList = props.currentTeam.players.map( (player, index) => {
    return (
      <ol key={player._id}>
        <li>Player {index + 1} - {player.handle}</li>
      </ol>
    )
  })
  return (
    <div className='live-game-ready-screen'>
      {teamList}
      <p>Current Score: {props.currentTeam.points}</p>
      <p className='ready-message'>{props.currentTeam.teamName}, ready your pencils!</p>
    </div>
  )
}