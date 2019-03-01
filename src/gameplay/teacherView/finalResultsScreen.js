import React from 'react';

export function FinalResultsScreen (props) {
  props.gameSession.teamList.sort((teamA, teamB) => teamB.points - teamA.points);

  const podium = props.gameSession.teamList.map((team, index) => {
    return (
      <li key={team._id}>
        <span>{index + 1}</span>
        <h3>{team.teamName}</h3>
        <p>{team.points} Points</p>
      </li>
    )
  })

  return (
    <div>
      <h2>Congratulations</h2>
      <button type='button' onClick={() => console.log('Restart clicked')}>Restart Game</button>
      <ul>
        {podium}
      </ul>
    </div>
  )
}