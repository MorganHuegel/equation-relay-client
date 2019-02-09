import React from 'react';

import { EnterUsername } from './enterUsername';

import { initialConnect, player_OnPlayerJoin } from './playerSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    socket.on('playerJoin', (newPlayerList) => player_OnPlayerJoin(newPlayerList, this));
    socket.emit('playerJoin', username)
    
  }

  render(){
    if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit}/>
    }
    return <p>hi:)</p>
  }
}