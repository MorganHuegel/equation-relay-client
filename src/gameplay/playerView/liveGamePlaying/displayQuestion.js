import React from 'react';

export function DisplayQuestion (props) {
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