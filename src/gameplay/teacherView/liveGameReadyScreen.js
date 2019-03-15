import React from 'react';

import '../../stylesheets/gameplay/teacherView/liveGameReadyScreen.css';

import { getGameTitle } from '../../fetchFunctions/teachers/getGameTitle';

export class LiveGameReadyScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gameTitle: '',
      numOfQuestions: 0
    };
  }

  componentWillMount(){
    return getGameTitle(this.props.gameId)
      .then(gameData => {
        this.setState({
          gameTitle: gameData.title,
          numOfQuestions: gameData.numOfQuestions
        })
      })
      .catch(err => {
        console.log('SHOULD HANDLE ERRORS HERE: ',err)
      });
    
  }


  render(){
    const displayTeams = this.props.teamList.map(team => {
      const displayMembers = team.players.map(player => <li key={player._id} className='player-name'>{player.handle}</li>)
      return <li className='team' key={team._id}>
        <ul className='player-list'>
          <h3 className='team-name'>{team.teamName}</h3>
          {displayMembers}
        </ul>
      </li>
    })

    return (
      <div className='live-game-ready-screen'>
        <h2>{this.state.gameTitle}</h2>
        <button type='button' className='start-button' onClick={() => this.props.startGame()}>Start Game</button>
        <button type='button' className='shuffle-button' onClick={() => this.props.shuffleTeams()}>Shuffle Teams</button>
        <p>{this.state.numOfQuestions} questions</p>
        <ul className='team-list'>
          {displayTeams}
        </ul>
      </div>
    )    
  }
}