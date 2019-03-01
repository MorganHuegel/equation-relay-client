import React from 'react';

import { HeaderSubmissionList } from './headerSubmissionList';

import { fetchQuestion } from '../../../fetchFunctions/players/fetchQuestion';

export class LiveGamePlayingMain extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentQuestion: null,
      guessingForPoints: false, //set to random player's ID
      alreadyGuessed: false
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.teamData.currentQuestion !== this.props.teamData.currentQuestion) {
      //FETCH NEW QUESTION AND UPDATE STATE
      const gameId = this.props.gameSessionData.gameId;
      const questionNumber = this.props.teamData.currentQuestion - 1;
      return fetchQuestion(gameId, questionNumber)
        .then(questionData => {
          console.log('QUESITON DATA:',questionData);
          this.setState({currentQuestion: questionData});
        })
        .catch(errMessage => {
          console.log('ERROR HANDLE HERE', errMessage);
        });
    }
  }


  render(){
    return (
      <div>
        <HeaderSubmissionList teamData={this.props.teamData}/>
        <p>Live Game Playing - Player</p>
      </div>
    )
  }
}