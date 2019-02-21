import React from 'react';

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
      const displayMembers = team.players.map(player => <li>{player.handle}</li>)
      return <li>
        <ul>
          <h3>{team.teamName}</h3>
          {displayMembers}
        </ul>
      </li>
    })

    return (
      <div>
        <h2>{this.state.gameTitle}</h2>
        <button type='button'>Start Game</button>
        <button type='button'>Shuffle Teams</button>
        <p>{this.state.numOfQuestions} questions</p>
        <ul>
          {displayTeams}
        </ul>
      </div>
    )    
  }
}