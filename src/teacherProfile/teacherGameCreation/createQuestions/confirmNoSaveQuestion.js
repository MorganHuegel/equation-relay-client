import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/confirmNoSaveQuestion.css';

export function ConfirmNoSaveQuestion (props) {
  if (props.confirmNoSave === false) {
    return null;
  } else {
    return (
      <div className='lightbox-container'>
        <div className='delete-question-lightbox'>
          <label>Discard changes to Question #{props.questionNumber}?</label>
          <button type='submit' onClick={event => props.changeQuestionsNoSave()}>Yes, discard changes</button>
          <button type='reset' onClick={() => props.toggleConfirmNoSave(false)}>No, keep editing</button>
        </div>
      </div>
    )
  }
}