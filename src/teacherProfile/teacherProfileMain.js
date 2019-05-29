import React from 'react';

import '../stylesheets/teacherProfile/teacherProfileMain.css';

import { Redirect } from 'react-router-dom';
import { GameList } from './teacherDashboard/gameList';
import { DashboardMenu } from './teacherDashboard/dashboardMenu';
import { CreateGame } from './teacherGameCreation/createTitle/createGame';
import { CreateQuestionsMain } from './teacherGameCreation/createQuestions/createQuestionsMain';
import { CreateNewButton } from './teacherDashboard/createNewButton';
import { DeleteLightBox } from './teacherDashboard/deleteLightBox';
import { DashboardUserMessage } from './teacherDashboard/dashboardUserMessage';

import { createNewGame } from '../fetchFunctions/teachers/createNewGame';
import { validateTitle } from './teacherGameCreation/createTitle/validateTitle';
import { fetchGameData } from '../fetchFunctions/teachers/fetchGameData';
import { deleteGameData } from '../fetchFunctions/teachers/deleteGameData';
import { startGameSession } from '../fetchFunctions/teachers/startGameSession';
import { TeacherGameplayMain } from '../gameplay/teacherView/teacherGameplayMain';

export class TeacherProfileMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      creating: false,
      currentGame: null,
      playing: false,
      deleting: false,
      userMessage: ''
    }
  }


  clickInactiveDashboardButton = (buttonText) => {
    if (buttonText !== 'Created Games') {
      this.setState({userMessage: `The ${buttonText} feature is not available yet.`})
    }
  }


  clickPlayLive = (gameId) => {
    return startGameSession(gameId)
      .then(sessionCode => {
        this.setState({
          creating: false,
          currentGame: null,
          playing: sessionCode,
          deleting: false,
          userMessage: ''
        })
      })
      .catch(errorMessage => {
        this.setState({
          creating: false,
          currentGame: null,
          playing: false,
          deleting: false,
          userMessage: errorMessage
        })
      })
  }


  closeLiveGame = () => {
    this.setState({
      creating: false,
      currentGame: null,
      playing: false,
      deleting: false,
      userMessage: ''
    })
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
          creating: false,
          userMessage: ''
        });
      })
      .catch(errMessage => {
        this.setState({
          creating: false,
          currentGame: null,
          playing: false,
          deleting: false,
          userMessage: ''
        });
      })
  }


  onEditClick = gameId => {
    return fetchGameData(gameId)
      .then(gameData => {
        this.setState({currentGame: gameData, userMessage: ''});
      })
  }


  setCurrentGame = (gameData) => {
    return this.setState({currentGame: gameData});
  }


  toggleDeletingState = gameId => {
    let gameObj = this.props.userData.games.find(game => game.id === gameId);
    if (!gameObj) gameObj = false;
    this.setState({deleting: gameObj, userMessage: ''});
  }


  confirmDelete = gameId => {
    return deleteGameData(gameId)
      .then(successMessage => {
        const updatedUserGames = this.props.userData.games.filter(game => game.id !== gameId);
        const updatedUserData = Object.assign({}, this.props.userData, {
          games: updatedUserGames
        })
        this.props.updateUserData(updatedUserData);
        this.setState({deleting: false, userMessage: successMessage});
      })
      .catch(errMessage => {
        this.setState({deleting: false, userMessage: errMessage})
      });
  }


  render(){
    if (!this.props.userData) {
      return <Redirect to='/teachers'/>
    }

    if (this.state.deleting) {
      return <DeleteLightBox 
        confirmDelete={this.confirmDelete}
        toggleDeletingState={this.toggleDeletingState}
        game={this.state.deleting}
      />
    }

    if (this.state.currentGame) {
      return <CreateQuestionsMain 
        currentGame={this.state.currentGame} 
        setCurrentGame={this.setCurrentGame} 
        updateUserData={this.props.updateUserData}/>
    }

    if (this.state.playing) {
      return <TeacherGameplayMain sessionCode={this.state.playing} closeLiveGame={this.closeLiveGame} clickPlayLive={this.clickPlayLive}/>
    }

    const createGameLightbox = this.state.creating ?
      <CreateGame initializeGame={this.initializeGame} setCreatingState={this.setCreatingState} updateUserData={this.props.updateUserData}/> :
      null;

    return (
      <div className='teacher-profile-main'>
        <div className='content-container'>
          
          { createGameLightbox }
          <h2>Hello {this.props.userData.username}!</h2>

          <DashboardMenu logout={this.logout} clickInactiveDashboardButton={this.clickInactiveDashboardButton}/>

          <div className='teacher-dashboard-games'>
            <CreateNewButton setCreatingState={this.setCreatingState}/>
            <DashboardUserMessage userMessage={this.state.userMessage} closeUserMessage={() => this.setState({userMessage: ''})}/>
            <GameList 
              games={this.props.userData.games} 
              onEditClick={this.onEditClick} 
              deleteGameClick={this.deleteGameClick} 
              toggleDeletingState={this.toggleDeletingState}
              clickPlayLive={this.clickPlayLive}/>
          </div>

        </div>
      </div>
    )
  }
}