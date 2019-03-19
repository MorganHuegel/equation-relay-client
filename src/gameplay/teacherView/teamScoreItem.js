import React from 'react';

import '../../stylesheets/gameplay/teacherView/teamScoreItem.css';

export function TeamScoreItem (props) {
  return (
    <li className='team-score-item'>
      <span className='team-place-number'>{props.index + 1}</span>
      <h3>
        {props.team.teamName}
      </h3>
      <p className='team-points'>{props.team.points} Points</p>
      <p className='team-questions-answered'>{props.team.currentQuestion} Questions Answered</p>
    </li>
  )
}