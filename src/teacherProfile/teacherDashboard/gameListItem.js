import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/gameListItem.css';

export function GameListItem (props) {
  const numOfQuestionsLabel = props.numOfQuestions === 1 ? `${props.numOfQuestions} Question` : `${props.numOfQuestions} Questions`;
  return (
    <li className='game-list-item'>
      <div className='title-container'>
        <h3>{props.title}</h3>
        <div className='game-list-buttons'>
          <button type='button' onClick={() => props.clickPlayLive(props.id)}>Play Live</button>
          <button type='button' onClick={() => props.onEditClick(props.id)}>Edit</button>
          <button type='button' onClick={() => props.toggleDeletingState(props.id)}>Delete</button>
        </div>
      </div>
      
      <p>{numOfQuestionsLabel}</p>

      <p className='description'>{props.description}</p>
    </li>
  );
}