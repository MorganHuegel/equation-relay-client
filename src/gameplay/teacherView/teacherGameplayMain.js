import React from 'react';

import { teacherGameplayMainWillMount, teacher_StartGame } from './teacherSocketUtils';
import { TeacherGameplayWaiting } from './teacherGameplayWaiting';

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

  startGame = () => {
    teacher_StartGame(this.socket, this);
  }

  render(){
    if (this.state.gameSession.teamList.length <= 0) {
      return <TeacherGameplayWaiting gameSession={this.state.gameSession} startGame={this.startGame} closeLiveGame={this.props.closeLiveGame} />
    }
    else {
      return <p>Playing Live Screen!</p>
    }
  }
}