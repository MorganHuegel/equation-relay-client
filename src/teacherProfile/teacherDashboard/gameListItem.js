import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/gameListItem.css';

export function GameListItem (props) {
  return (
    <div className='game-list-item'>
      <h3>{props.title}</h3>
      <div>
        <button type='button'>Play Live</button>
        <button type='button' onClick={() => props.onEditClick(props.id)}>Edit</button>
        <button type='button'>Delete</button>
      </div>

      <p>{props.description}</p>
    </div>
  );
}