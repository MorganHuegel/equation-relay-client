import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/createNewButton.css';

export function CreateNewButton (props) {
  return (
    <div className='create-new-button'>
      <button type='button' onClick={() => props.setCreatingState(true)}>
        <i className='fas fa-plus-circle'></i>
        <p>Create New</p>
      </button>
    </div>
  )
}