import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../stylesheets/gameplay/playerView/joinMain.css';

import { EnterUsername } from './enterUsername';
import { PlayerJoinedAndWaiting } from './playerJoinedAndWaiting';
import { LiveGameReadyScreen } from './liveGameReadyScreen';
import { LiveGamePlayingMain } from './liveGamePlaying/liveGamePlayingMain';
import { FinalResultsScreen } from './finalResultsScreen';
import { revealHeader } from '../../landingPage/header';

import { 
  initialConnect, 
  player_OnPlayerJoin, 
  player_ShuffleTeams, 
  player_StartGame, 
  player_EndGame, 
  player_NextQuestion,
  player_TeamScored,
  player_HandleAnswer,
  player_AssignGuesser,
  player_Removed
} from './playerSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentTeam: null,
      gameSession: null,
      errorMessage: null,
      newGame: false
    }
    this.socket = null;
  }

  componentDidMount(){
    if (sessionStorage.getItem('redirectToJoin')) {
      return this.redirectToJoinLanding();
    }
    if (!window.location.href.endsWith('#')) {
      window.history.pushState(null, null, window.location.href + '#')
    }
    window.addEventListener('popstate', this.disableBackButtonEvent)
    window.addEventListener('beforeunload', this.windowRefreshWarning)
    window.addEventListener('unload', this.windowUnloadEvent)
  }

  componentWillUnmount(){
    window.removeEventListener('popstate', this.disableBackButtonEvent);
    window.removeEventListener('beforeunload', this.windowRefreshWarning);
    window.removeEventListener('unload', this.windowUnloadEvent);
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  windowUnloadEvent = (event) => {
    event.preventDefault();
    sessionStorage.setItem('redirectToJoin', true)
    this.socket.emit('removePlayer', this.state.currentUser._id);
  }

  windowRefreshWarning = (event) => {
    event.preventDefault();
    event.returnValue = 'This will exit you from the game. Continue?'
    return event.returnValue;
  }


  disableBackButtonEvent = (event) => {
    let confirmBackButton = window.confirm(`This will remove you from the game.  Continue anyway?`);
    if (confirmBackButton) {
      if (this.socket) {
        this.socket.emit('removePlayer', this.state.currentUser._id);
      } else {
        this.redirectToJoinLanding();
      }
    } else {
      window.history.pushState(null, null, window.location.href + '#')
    }
  }

  redirectToJoinLanding = (closeSocket = false) => {
    this.setState({
      currentUser: null,
      currentTeam: null,
      gameSession: null,
      errorMessage: null,
      newGame: true
    }, () => {
      if (closeSocket) this.socket.disconnect();
      revealHeader();
      return sessionStorage.getItem('redirectToJoin') ? sessionStorage.clear() : null
    })
  }


  clearGameSession = () => {
    //revealHeader();
    this.redirectToJoinLanding();
  }


  onUsernameSubmit = event => {
    event.preventDefault();
    const username = document.getElementById('enter-name').value;
    if (!username) return this.setState({errorMessage: 'Enter a username to join.'})
    else if (username.trim() !== username) return this.setState({errorMessage: 'Make sure there are no whitespaces in your name.'})
    else if (username.length > 20) return this.setState({errorMessage: 'Whoa! Be reasonable!  Enter a username that is shorter than 20 letters.'})

    const socket = initialConnect(this.props.match.params.sessionCode);
    this.socket = socket;
    socket.on('playerJoin', (gameSessionData) => player_OnPlayerJoin(gameSessionData, username, this));
    socket.emit('playerJoin', username)
    socket.on('uniqueUsernameError', (errorMessage) => {
      this.socket.disconnect();
      this.socket = null;
      this.setState({errorMessage})
    })
    socket.on('alreadyBegunError', (errorMessage) => {
      this.socket.disconnect();
      this.socket = null;
      this.setState({errorMessage});
    })
    socket.on('noSessionExists', (errorMessage) => {
      this.socket.disconnect();
      this.socket = null;
      this.setState({errorMessage});
    })
    socket.on('shuffleTeams', (gameSessionData) => player_ShuffleTeams(gameSessionData, this));
    socket.on('startGame', (gameSessionData) => player_StartGame(gameSessionData, this));
    socket.on('nextQuestion', (gameSessionData) => player_NextQuestion(gameSessionData, this));
    socket.on('wrongAnswer', (gameSessionData) => player_HandleAnswer(gameSessionData, this));
    socket.on('correctAnswer', (gameSessionData) => player_HandleAnswer(gameSessionData, this));
    socket.on('assignGuesser', (gameSessionData) => player_AssignGuesser(gameSessionData, this));
    socket.on('teamScored', (gameSessionData) => player_TeamScored(gameSessionData, this));
    socket.on('endGame', (deletedGameSessionData) => player_EndGame(deletedGameSessionData, this));
    socket.on('error', (errorMessage) => this.setState({errorMessage}));
    socket.on('playerRemoved', (gameSessionData) => player_Removed(gameSessionData, this));
  }

  render(){
    if (this.state.newGame) {
      return <Redirect to='/join'/>
    } else if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit} errorMessage={this.state.errorMessage}/>
    } else if (!this.state.gameSession.teamList || this.state.gameSession.teamList.length === 0) {
      return <PlayerJoinedAndWaiting handle={this.state.currentUser.handle}/>
    } else if (!this.state.gameSession.startedGame) {
      return <LiveGameReadyScreen currentTeam={this.state.currentTeam}/>
    } else if (this.state.gameSession.endedGame) {
      return <FinalResultsScreen gameSession={this.state.gameSession} currentTeam={this.state.currentTeam} clearGameSession={this.clearGameSession}/>
    } else {
      return <LiveGamePlayingMain teamData={this.state.currentTeam} gameSessionData={this.state.gameSession} currentUser={this.state.currentUser} socket={this.socket}/>
    }
  }
}