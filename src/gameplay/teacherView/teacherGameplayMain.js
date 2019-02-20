import React from 'react';

import { teacherGameplayMainWillMount } from './teacherSocketUtils';
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
    console.log('Start Game!!');
  }

  render(){
    if (this.state.gameSession.teamList.length <= 0) {
      return <TeacherGameplayWaiting gameSession={this.state.gameSession} startGame={this.startGame} closeLiveGame={this.props.closeLiveGame} />
    }
    else {
      return <p>Playing Live Screen!</p>
    }
    // const playersJoined = this.state.gameSession.playerList.map(player => {
    //   return <p key={player._id}>{player.handle}</p>
    // })
    // return (
    //   <div className='teacher-gameplay-main'>
    //     <h2>Join Code: {this.props.sessionCode}</h2>
    //     <p>Player Count: {this.state.gameSession.playerList.length}</p>
    //     {playersJoined}
    //     <button type='button' onClick={() => this.startGame()}>Start Game</button>
    //     <button type='button' onClick={() => this.props.closeLiveGame()}>Quit</button>
    //   </div>
    // );
  }
}