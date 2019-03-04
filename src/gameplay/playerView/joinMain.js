import React from 'react';

import { EnterUsername } from './enterUsername';
import { PlayerJoinedAndWaiting } from './playerJoinedAndWaiting';
import { LiveGameReadyScreen } from './liveGameReadyScreen';
import { LiveGamePlayingMain } from './liveGamePlaying/liveGamePlayingMain';
import { FinalResultsScreen } from './finalResultsScreen';

import { 
  initialConnect, 
  player_OnPlayerJoin, 
  player_ShuffleTeams, 
  player_StartGame, 
  player_EndGame, 
  player_NextQuestion,
  player_wrongAnswer 
} from './playerSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentTeam: null,
      gameSession: null,
      errorMessage: null
    }
    this.socket = null;
  }

  componentWillUnmount(){
    if (this.socket) {
      this.socket.disconnect();
    }
  }


  onUsernameSubmit = event => {
    event.preventDefault();
    const username = document.getElementById('enter-name').value;
    if (!username || (username.trim() !== username)){
      console.log('USERNAME ERROR HANDLING GOES HERE');
      return;
    }

    const socket = initialConnect(this.props.match.params.sessionCode);
    this.socket = socket;
    socket.on('playerJoin', (gameSessionData) => player_OnPlayerJoin(gameSessionData, username, this));
    socket.on('uniqueUsernameError', (errMessage) => this.setState({errorMessage: errMessage}));
    socket.emit('playerJoin', username)
    socket.on('shuffleTeams', (gameSessionData) => player_ShuffleTeams(gameSessionData, this));
    socket.on('startGame', (gameSessionData) => player_StartGame(gameSessionData, this));
    socket.on('nextQuestion', (gameSessionData) => player_NextQuestion(gameSessionData, this));
    socket.on('wrongAnswer', (gameSessionData) => player_wrongAnswer(gameSessionData, this));
    socket.on('teamScored', (gameSessionData) => this.setState({gameSession: gameSessionData}));
    socket.on('endGame', (deletedGameSessionData) => player_EndGame(deletedGameSessionData, this));
    socket.on('error', (errorMessage) => this.setState({errorMessage}))
  }

  render(){
    if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit} errorMessage={this.state.errorMessage}/>
    } else if (!this.state.gameSession.teamList || this.state.gameSession.teamList.length === 0) {
      return <PlayerJoinedAndWaiting handle={this.state.currentUser.handle}/>
    } else if (!this.state.gameSession.startedGame) {
      return <LiveGameReadyScreen currentTeam={this.state.currentTeam}/>
    } else if (this.state.gameSession.endedGame) {
      return <FinalResultsScreen gameSession={this.state.gameSession} currentTeam={this.state.currentTeam}/>
    } else {
      return <LiveGamePlayingMain teamData={this.state.currentTeam} gameSessionData={this.state.gameSession} currentUser={this.state.currentUser} socket={this.socket}/>
    }
  }
}