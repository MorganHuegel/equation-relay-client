import React from 'react';

import '../../stylesheets/gameplay/playerView/enterUsername.css';

export function EnterUsername(props){
  return (
    <div className='enter-username'>
        <p>Game Session: {props.sessionCode}</p>
        <form name='enter-username-form' onSubmit={e => props.onUsernameSubmit(e)}>
          <label htmlFor='enter-name'>Enter your name:</label>
          <input type='text' id='enter-name' name='enter-name' placeholder='e.g. Chris P.'/>
          <button type='submit'>Enter</button>
        </form>
        <p className='error-message'>{props.errorMessage}</p>
      </div>
  )
}