import React from 'react';

import { TeamScoreItem } from './teamScoreItem';

export function LiveGameScoreboard(props){
  const teamScoreList = props.gameSession.teamList.map( (team, index) => {
    return <TeamScoreItem team={team} index={index} gameId={props.gameSession.gameId} key={team._id}/>
  })
  return <div>
    <h2>Leaderboard</h2>
    <button onClick={() => console.log('clicked End Game')}>End Game</button>
    <ul>
      {teamScoreList}
    </ul>
  </div>
}