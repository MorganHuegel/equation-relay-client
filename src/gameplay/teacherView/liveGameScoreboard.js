import React from 'react';

import '../../stylesheets/gameplay/teacherView/liveGameScoreboard.css';

import { TeamScoreItem } from './teamScoreItem';

export function LiveGameScoreboard(props){
  props.gameSession.teamList.sort((teamA, teamB) => teamB.points - teamA.points);
  const teamScoreList = props.gameSession.teamList.map( (team, index) => {
    return <TeamScoreItem team={team} index={index} gameId={props.gameSession.gameId} key={team._id}/>
  })
  return (
    <div className='live-game-scoreboard'>
      <h2>Leaderboard</h2>
      <button onClick={() => props.endGame()}>End Game</button>
      <ul className='team-score-list'>
        {teamScoreList}
      </ul>
    </div>
  )
}