import React from 'react';

export function TeamScoreItem (props) {
  return (
    <li>
      <span>{props.index + 1}</span>
      <h3>{props.team.teamName}</h3>
      <p>{props.team.points} Points</p>
      <p>{props.team.currentQuestion} Questions Answered</p>
    </li>
  )
}