import React from 'react';

import '../../stylesheets/gameplay/playerView/finalResultsScreen.css';

export function FinalResultsScreen (props) {
  props.gameSession.teamList.sort( (teamA, teamB) => teamB.points - teamA.points);

  const currentTeam = props.gameSession.teamList.find(team => team._id === props.currentTeam._id);
  const finalPlace = props.gameSession.teamList.findIndex(team => team._id === props.currentTeam._id);
  
  let placeClass;
  switch(finalPlace){
    case(0):
      placeClass = 'first';
      break;
    case(1):
      placeClass = 'second';
      break;
    case(2):
      placeClass = 'third';
      break;
    default:
      placeClass = '';
  }

  return (
    <div className={'player-final-results-screen ' + placeClass}>
      <h3 className='team-name'>{currentTeam.teamName}</h3>
      <p className='team-score'>Final Score: {currentTeam.points}</p>
      <p className='team-place'>Final Place: {finalPlace + 1}</p>
      <button className='new-game-button' onClick={() => props.clearGameSession()}>New Game</button>
    </div>
  )
}