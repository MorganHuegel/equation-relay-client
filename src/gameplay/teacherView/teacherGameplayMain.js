import React from 'react';

import { teacherGameplayMainWillMount, teacher_ShuffleTeams, teacher_startGame, teacher_EndGame } from './teacherSocketUtils';
import { TeacherGameplayWaiting } from './teacherGameplayWaiting';
import { LiveGameReadyScreen } from './liveGameReadyScreen';
import { LiveGameScoreboard } from './liveGameScoreboard';
import { FinalResultsScreen } from './finalResultsScreen';

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
        startedGame: false,
        endedGame: false
      },
    }
    this.socket = null
  }

  componentWillMount(){
    teacherGameplayMainWillMount(this);
  }

  componentDidMount(){
    if (!window.location.href.endsWith('#')) {
      window.history.pushState(null, null, window.location.href + '#')
    }
    window.addEventListener('popstate', this.disableBackButtonEvent)
    window.addEventListener('beforeunload', this.windowRefreshWarning)
  }

  componentWillUnmount(){
    window.removeEventListener('popstate', this.disableBackButtonEvent);
    window.removeEventListener('beforeunload', this.windowRefreshWarning);
    if (this.socket && this.socket.connected) {
      this.socket.emit('endGame');
      this.socket.disconnect();
    }
  }

  disableBackButtonEvent = (event) => {
    let confirmBackButton = window.confirm(`This will close the game.  Continue anyway?`);
    if (confirmBackButton) {
      this.props.closeLiveGame()
    } else {
      window.history.pushState(null, null, window.location.href + '#')
    }
  }

  windowRefreshWarning = (event) => {
    event.preventDefault();
    event.returnValue = 'This will exit you from the game. Continue?'
    return event.returnValue;
  }




  shuffleTeams = () => {
    teacher_ShuffleTeams(this.socket, this);
  }

  startGame = () => {
    teacher_startGame(this.socket, this);
  }

  endGame = () => {
    teacher_EndGame(this.socket, this);
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
    } else if (!this.state.gameSession.endedGame) {
      return <LiveGameScoreboard socket={this.socket} gameSession={this.state.gameSession} endGame={this.endGame}/>
    } else {
      return <FinalResultsScreen gameSession={this.state.gameSession}/>
    }
  }
}