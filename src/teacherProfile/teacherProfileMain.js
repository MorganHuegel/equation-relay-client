import React from 'react';

import '../stylesheets/teacherProfile/teacherProfileMain.css';

import { Redirect } from 'react-router-dom';
import { GameList } from './teacherDashboard/gameList';
import { DashboardMenu } from './teacherDashboard/dashboardMenu';
import { CreateGame } from './teacherGameCreation/createTitle/createGame';
import { CreateQuestionsMain } from './teacherGameCreation/createQuestions/createQuestionsMain';

import { createNewGame } from '../fetchFunctions/createNewGame';
import { validateTitle } from './teacherGameCreation/createTitle/validateTitle';
import { fetchUserData } from '../fetchFunctions/fetchUserData';

export class TeacherProfileMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      creating: false,
      currentGame: null,
      playing: false
    }
  }


  componentDidUpdate () {
    const token = localStorage.getItem('authToken');
    if (token) {
      return fetchUserData(token)
        .then(userData => {
          this.props.updateUserData(userData);
        })
        .catch(e => console.log('Could not update user data.'))
    }
  }

  
  logout = () => {
    localStorage.clear();
    this.props.updateUserData(null);
  }


  setCreatingState = bool => {
    this.setState({creating: bool});
  }


  initializeGame = event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!validateTitle(title)) return;

    return createNewGame (title, description)
      .then(gameData => {
        this.setState({
          currentGame: gameData,
          creating: false
        });
      })
      .catch(errMessage => console.log(errMessage))
  }


  render(){
    if (!this.props.userData) {
      return <Redirect to='/teachers'/>
    }

    if (this.state.currentGame) {
      return <CreateQuestionsMain currentGame={this.state.currentGame}/>
    }

    const createGameLightbox = this.state.creating ?
      <CreateGame initializeGame={this.initializeGame} setCreatingState={this.setCreatingState}/> :
      null;

    return (
      <div className='teacher-profile-main'>
        { createGameLightbox }
        <h2>Hello {this.props.userData.username}!</h2>

        <DashboardMenu logout={this.logout}/>

        <div className='teacher-dashboard-games'>
          <div className='create-new'>
            <button type='button' onClick={() => this.setCreatingState(true)}>
              <i className='fas fa-plus-circle'></i>
              <p>Create New</p>
            </button>
          </div>
          <GameList games={this.props.userData.games}/>
        </div>

      </div>
    )
  }
}