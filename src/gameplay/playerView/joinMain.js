import React from 'react';

import { EnterUsername } from './enterUsername';
import { PlayerJoinedAndWaiting } from './playerJoinedAndWaiting';
import { LiveGameReadyScreen } from './liveGameReadyScreen';

import { initialConnect, player_OnPlayerJoin, player_StartGame } from './playerSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
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
    socket.on('playerJoin', (gameSessionData) => player_OnPlayerJoin(gameSessionData, username, this));
    socket.on('uniqueUsernameError', (errMessage) => this.setState({errorMessage: errMessage}));
    socket.emit('playerJoin', username)
    socket.on('startGame', (gameSessionData) => player_StartGame(gameSessionData, this));
  }

  render(){
    if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit} errorMessage={this.state.errorMessage}/>
    } else if (!this.state.gameSession.teamList || this.state.gameSession.teamList.length === 0) {
      return <PlayerJoinedAndWaiting handle={this.state.currentUser.handle}/>
    }

    return <LiveGameReadyScreen />
  }
}