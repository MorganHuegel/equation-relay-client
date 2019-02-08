import React from 'react';

import { EnterUsername } from './playerView/enterUsername';

import { initialConnect } from './playerView/studentSocketUtils';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSession: null
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
    socket.emit('playerJoin', username)
  }

  render(){
    if (!this.state.gameSession) {
      return <EnterUsername sessionCode={this.props.match.params.sessionCode} onUsernameSubmit={this.onUsernameSubmit}/>
    }
    return <p>hi:)</p>
  }
}