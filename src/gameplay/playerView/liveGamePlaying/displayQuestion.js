import React from 'react';

export function DisplayQuestion (props) {
  if (props.currentUser.alreadyGuessed && props.currentUser.correctGuess) {
    return (
      <div>
        <p>Solve your equation:</p>
        <p>{props.equation}</p>
        <p>Then add the solutions of all {props.numOfTeammates} group members:</p>
        <p>Correct submission! Tell yo' friends!</p>
      </div>
    );
  } 

  else if (props.currentUser.alreadyGuessed) {
    return (
      <div>
        <p>Solve your equation:</p>
        <p>{props.equation}</p>
        <p>Then add the solutions of all {props.numOfTeammates} group members:</p>
        <p>Nope, sorry! Did you add the answers of all your teammates?</p>
      </div>
    )
  }

  else {
    return (
      <div>
        <p>Solve your equation:</p>
        <p>{props.equation}</p>
        <p>Then add the solutions of all {props.numOfTeammates} group members:</p>
        <label htmlFor='group-solution'>Total is...</label>
        <input type='text' name='group-solution' id='group-solution'/>
        <button type='button' onClick={props.checkAnswer}>Submit</button>
      </div>
    );
    }
}