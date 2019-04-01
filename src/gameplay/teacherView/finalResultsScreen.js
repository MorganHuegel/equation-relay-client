import React from 'react';

import '../../stylesheets/gameplay/teacherView/finalResultsScreen.css';

export function FinalResultsScreen (props) {
  props.gameSession.teamList.sort((teamA, teamB) => teamB.points - teamA.points);

  const podium = props.gameSession.teamList.map((team, index) => {
    return (
      <li key={team._id} className='podium-team'>
        <span className='team-place'>{index + 1}</span>
        <h3 className='team-name'>{team.teamName}</h3>
        <p className='team-points'>{team.points} Points</p>
      </li>
    )
  })

  return (
    <div className='final-results-screen'>
      <h2>Congratulations!</h2>
      <button type='button' onClick={() => console.log('Restart clicked')}>Restart Game</button>
      <ul className='podium-team-list'>
        {podium}
      </ul>
    </div>
  )
}