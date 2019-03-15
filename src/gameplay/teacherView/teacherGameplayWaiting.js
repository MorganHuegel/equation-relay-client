import React from 'react';

import '../../stylesheets/gameplay/teacherView/teacherGameplayWaiting.css';

export function TeacherGameplayWaiting(props){
  const playersJoined = props.gameSession.playerList.map(player => {
    return <li key={player._id} className='player-name'>{player.handle}</li>
  })
  return (
    <div className='teacher-gameplay-waiting'>
        <h2>Join Code: {props.gameSession.sessionCode}</h2>
        
        <div>
          <p>Player Count: {props.gameSession.playerList.length}</p>
          <button type='button' className='start-button' onClick={() => props.shuffleTeams()}>Start Game</button>
          <button type='button' className='quit-button' onClick={() => props.closeLiveGame()}>Quit</button>
        </div>

        <ul className='player-list'>
          {playersJoined}
        </ul>

      </div>
  )
}