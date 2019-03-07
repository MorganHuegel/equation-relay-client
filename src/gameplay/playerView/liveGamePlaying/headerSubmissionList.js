import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/headerSubmissionList.css';

export function HeaderSubmissionList (props) {
  const playersList = props.teamData.players.map(player => {
    const key = player._id;
    if (player.alreadyGuessed) {
      const correct = player.correctGuess ? 'correct' : 'wrong';
      return <li key={key} className={`already-guessed ${correct}`}>{player.handle}</li>
    } else {
      return <li key={key}>{player.handle}
        <span> (not submitted)</span>
        <button onClick={() => props.skipPlayer(player._id)} className='skip-button'>Skip</button>
      </li>
    }
  });

  return (
    <div className='header-submission-list'>
      <h3>{props.teamData.teamName}</h3>
      <ul>
        {playersList}
      </ul>
      <p>Current Score: {props.teamData.points}</p>
    </div>
  )
}