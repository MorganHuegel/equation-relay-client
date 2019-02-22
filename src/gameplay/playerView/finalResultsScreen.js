import React from 'react';

export function FinalResultsScreen (props) {
  props.gameSession.teamList.sort( (teamA, teamB) => teamB.points - teamA.points);

  const currentTeam = props.gameSession.teamList.find(team => team._id === props.currentTeam._id);
  const finalPlace = props.gameSession.teamList.findIndex(team => team._id === props.currentTeam._id);

  return (
    <div>
      <h3>{currentTeam.teamName}</h3>
      <p>Final Score: {currentTeam.points}</p>
      <p>Final Place: {finalPlace + 1}</p>
    </div>
  )
}