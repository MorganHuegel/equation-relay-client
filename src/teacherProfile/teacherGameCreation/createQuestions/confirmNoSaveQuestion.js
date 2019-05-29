import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/confirmNoSaveQuestion.css';

export function ConfirmNoSaveQuestion (props) {
  if (!props.confirmNoSave) {
    return null;
  } else {
    return (
      <div className='lightbox-container'>
        <div className='delete-question-lightbox'>
          <form onSubmit={event => event.preventDefault()}>
            <label>Discard changes to Question #{props.questionNumber}?</label>
            <button type='submit' onClick={event => console.log(event.target)}>Yes, discard changes</button>
            <button type='reset' onClick={event => console.log(event.target)}>No, keep editing</button>
          </form>
        </div>
      </div>
    )
  }
}