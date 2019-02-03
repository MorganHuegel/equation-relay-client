import React from 'react';

export function TeacherGameplayMain(props){
  return (
    <div>
      <p>Teacher Gameplay Main {props.sessionCode}</p>
      <button type='button' onClick={() => props.closeLiveGame()}>Quit</button>
    </div>

  );
}