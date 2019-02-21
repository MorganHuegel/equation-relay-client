import React from 'react';

export function LiveGameReadyScreen (props) {
  const teamName = props.currentTeam ? props.currentTeam.teamName : '';
  
  return (
    <p>Live Game Here! {teamName}</p>
  )
}