import React from 'react';
import Spinner from 'react-spinkit';

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

  componentWillMount(){
    // GETS the first question before page load
    const gameId = this.props.gameSessionData.gameId;
    const questionIndex = this.props.teamData.currentQuestion - 1;
    return fetchQuestion(gameId, questionIndex)
      .then(questionData => {
        this.setState({currentQuestion: questionData});
      })
      .catch(errMessage => {
        console.log('ERROR HANDLE HERE', errMessage);
      });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.teamData.currentQuestion !== this.props.teamData.currentQuestion) {
      //FETCH NEW QUESTION AND UPDATE STATE
      const gameId = this.props.gameSessionData.gameId;
      const questionNumber = this.props.teamData.currentQuestion - 1;
      return fetchQuestion(gameId, questionNumber)
        .then(questionData => {
          this.setState({currentQuestion: questionData});
        })
        .catch(errMessage => {
          console.log('ERROR HANDLE HERE', errMessage);
        });
    }
  }


  render(){
    if (!this.state.currentQuestion) {
      return <Spinner />
    }

    let equationToDisplay;
    switch (this.props.currentUser.assignedEquationIndex) {
      case(0):
        equationToDisplay = this.state.currentQuestion.equation1;
        break;
      case(1):
        equationToDisplay = this.state.currentQuestion.equation2;
        break;
      case(2):
        equationToDisplay = this.state.currentQuestion.equation3;
        break;
      default:
        equationToDisplay = this.state.currentQuestion.equation4;
    }

    return (
      <div>
        <HeaderSubmissionList teamData={this.props.teamData}/>
        <p>Equation - {equationToDisplay.equation}</p>
        <p>Answer - {equationToDisplay.answer}</p>
      </div>
    )
  }
}