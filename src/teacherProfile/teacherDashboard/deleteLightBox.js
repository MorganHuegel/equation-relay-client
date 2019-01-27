import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/deleteLightBox.css';

export function DeleteLightBox (props) {
  return (
    <div className='lightbox-container'>
      <div className='delete-game-lightbox'>
        <p>Are you sure you want to delete <span class='title-name'>{props.game.title}</span>?</p>
        <button onClick={() => props.confirmDelete(props.game.id)} class='confirm-delete'>Yes</button>
        <button onClick={() => props.toggleDeletingState(null)} class='cancel-delete'>No</button>
      </div>
    </div>
  )
}