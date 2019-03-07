import React from 'react';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/displayQuestion.css';

export function DisplayQuestion (props) {
  if (props.currentUser.alreadyGuessed && props.currentUser.correctGuess) {
    return (
      <div className='display-question'>
        <p className='instructions'>Solve your equation:</p>
        <p className='display-equation'>{props.equation}</p>
        <p className='instructions'>Then <span>add the solutions</span> of all {props.numOfTeammates} group members:</p>
        <p>Correct submission! Tell yo' friends!</p>
      </div>
    );
  } 

  else if (props.currentUser.alreadyGuessed) {
    return (
      <div className='display-question'>
        <p className='instructions'>Solve your equation:</p>
        <p className='display-equation'>{props.equation}</p>
        <p className='instructions'>Then <span>add the solutions</span> of all {props.numOfTeammates} group members:</p>
        <p>Nope, sorry! Did you add the answers of all your teammates?</p>
      </div>
    )
  }

  else {
    return (
      <div className='display-question'>
        <p className='instructions'>Solve your equation:</p>
        <p className='display-equation'>{props.equation}</p>
        <p className='instructions'>Then <span>add the solutions</span> of all {props.numOfTeammates} group members:</p>
        <label htmlFor='group-solution'>Total is...</label>
        <input type='text' name='group-solution' id='group-solution'/>
        <button type='button' onClick={props.checkAnswer}>Submit</button>
      </div>
    );
    }
}