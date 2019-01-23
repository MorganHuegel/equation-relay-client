import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/createGame.css';

import { CreateGameForm } from './createGameForm';

import { fetchUserData } from '../../../fetchFunctions/fetchUserData';

export class CreateGame extends React.Component {
  componentWillUnmount () {
    const token = localStorage.getItem('authToken');
    if (token) {
      return fetchUserData(token)
        .then(userData => {
          this.props.updateUserData(userData);
        })
        .catch(e => console.log('Could not update user data.'))
    }
  }

  render() {
    return (
      <div className='lightbox-container'>
        <div className='create-game-lightbox'>
          <h1>Create New Game</h1>
          <p className='create-game-error'></p>
          <CreateGameForm setCreatingState={this.props.setCreatingState} initializeGame={this.props.initializeGame}/>
        </div>
      </div>
    )
  }
}