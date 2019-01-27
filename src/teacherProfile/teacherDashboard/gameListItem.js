import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/gameListItem.css';

export function GameListItem (props) {
  const numOfQuestionsLabel = props.numOfQuestions === 1 ? `${props.numOfQuestions} Question` : `${props.numOfQuestions} Questions`;
  return (
    <div className='game-list-item'>
      <h3>{props.title}</h3>
      <p>{numOfQuestionsLabel}</p>
      <div>
        <button type='button'>Play Live</button>
        <button type='button' onClick={() => props.onEditClick(props.id)}>Edit</button>
        <button type='button' onClick={() => props.deleteGameClick(props.id)}>Delete</button>
      </div>

      <p>{props.description}</p>
    </div>
  );
}