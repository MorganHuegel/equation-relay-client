import React from 'react';

import { EnterUsername } from './enterUsername';

import { initialConnect, player_OnPlayerJoin, player_StartGame } from './playerSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      gameSession: null
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
    socket.emit('playerJoin', username)
    socket.on('startGame', (gameSessionData) => player_StartGame(gameSessionData, this));
    
  }

  render(){
    if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit}/>
    }
    return <p>Hello {this.state.currentUser.handle}!</p>
  }
}