import React from 'react';

import { teacherGameplayMainWillMount } from './teacherSocketUtils';

export class TeacherGameplayMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameSession: {
        leader: null,
        sessionCode: this.props.sessionCode,
        gameId: null,
        playerList: [],
        teamList: []
      }
    }
    this.socket = null
  }

  componentWillMount(){
    teacherGameplayMainWillMount(this);
  }

  componentWillUnmount(){
    this.socket.disconnect();
  }

  render(){
    const playersJoined = this.state.gameSession.playerList.map(player => {
      return <p key={player._id}>{player.handle}</p>
    })
    return (
      <div className='teacher-gameplay-main'>
        <h2>Join Code: {this.props.sessionCode}</h2>
        {playersJoined}
        <button type='button' onClick={() => this.props.closeLiveGame()}>Quit</button>
      </div>
    );
  }
}