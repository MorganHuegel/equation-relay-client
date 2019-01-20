import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/createGameForm.css';

export function CreateGameForm (props) {
  return (
    <form name='create-game-form' className='create-game-form'>
      <p>
        <label htmlFor='title'>Title</label>
        <input type='text' placeholder='e.g. One-Step Equations' name='title' id='title' onChange={e => e.target.classList.remove('error-input')}/>
      </p>
      

      <p>
        <label htmlFor='description'>Description</label>
        <textarea type='text' placeholder='e.g. Aligns to Math 6 Standard 1A. Uses integers only, numbers up to 100.' name='description' id='description' rows='5'/>
      </p>

      <button type='submit' onClick={e => props.initializeGame(e)}>Add Questions</button>
      <button type='reset' onClick={() => props.setCreatingState(false)}>Cancel</button>
    </form>
  )
}