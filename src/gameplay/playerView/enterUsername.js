import React from 'react';

export function EnterUsername(props){
  return (
    <div>
        <p>Game Session: {props.sessionCode}</p>
        <form>
          <label for='enter-name'>Enter your name:</label>
          <input type='text' id='enter-name' name='enter-name' placeholder='e.g. Chris P.'/>
          <button type='submit'>Enter</button>
        </form>
      </div>
  )
}