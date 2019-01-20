import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/createGame.css';

import { CreateGameForm } from './createGameForm';

export function CreateGame (props) {
  return (
    <div className='lightbox-container'>
      <div className='create-game-lightbox'>
        <h1>Create New Game</h1>
        <p className='create-game-error'></p>
        <CreateGameForm setCreatingState={props.setCreatingState} initializeGame={props.initializeGame}/>
      </div>
    </div>
  )
}