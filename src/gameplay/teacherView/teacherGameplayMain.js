import React from 'react';

import { teacherGameplayMainWillMount, teacher_ShuffleTeams, teacher_startGame } from './teacherSocketUtils';
import { TeacherGameplayWaiting } from './teacherGameplayWaiting';
import { LiveGameReadyScreen } from './liveGameReadyScreen';
import { LiveGameScoreboard } from './liveGameScoreboard';

export class TeacherGameplayMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameSession: {
        leader: null,
        sessionCode: this.props.sessionCode,
        gameId: null,
        playerList: [],
        teamList: [],
        startedGame: false
      },
    }
    this.socket = null
  }

  componentWillMount(){
    teacherGameplayMainWillMount(this);
  }

  componentWillUnmount(){
    this.socket.disconnect();
  }

  shuffleTeams = () => {
    teacher_ShuffleTeams(this.socket, this);
  }

  startGame = () => {
    teacher_startGame(this.socket, this);
  }

  render(){
    if (this.state.gameSession.teamList.length <= 0) {
      return <TeacherGameplayWaiting gameSession={this.state.gameSession} shuffleTeams={this.shuffleTeams} closeLiveGame={this.props.closeLiveGame} />
    }
    else if (!this.state.gameSession.startedGame) {
      return <LiveGameReadyScreen 
        gameId={this.state.gameSession.gameId} 
        teamList={this.state.gameSession.teamList} 
        shuffleTeams={this.shuffleTeams} 
        startGame={this.startGame}/>
    } else {
      return <LiveGameScoreboard />
    }
  }
}