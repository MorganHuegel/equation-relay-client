import React from 'react';

export function TeacherGameplayWaiting(props){
  const playersJoined = props.gameSession.playerList.map(player => {
    return <p key={player._id}>{player.handle}</p>
  })
  return (
    <div className='teacher-gameplay-main'>
        <h2>Join Code: {props.gameSession.sessionCode}</h2>
        <p>Player Count: {props.gameSession.playerList.length}</p>
        {playersJoined}
        <button type='button' onClick={() => props.startGame()}>Start Game</button>
        <button type='button' onClick={() => props.closeLiveGame()}>Quit</button>
      </div>
  )
}