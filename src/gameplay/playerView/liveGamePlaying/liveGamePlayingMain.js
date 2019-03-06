import React from 'react';
import Spinner from 'react-spinkit';

import { HeaderSubmissionList } from './headerSubmissionList';
import { DisplayQuestion } from './displayQuestion';
import { GuessingForPointsMain } from './guessingForPointsMain';

import { fetchQuestion } from '../../../fetchFunctions/players/fetchQuestion';
import { checkAnswer } from './checkAnswerUtil';

export class LiveGamePlayingMain extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentQuestion: null,
      pointDifference: null
    }
  }

  componentWillMount(){
    //Will update gameSession data with
    this.props.socket.emit('nextQuestion', {
      teamId: this.props.teamData._id, 
      playerId: this.props.currentUser._id
    });
  }

  componentDidMount(){
    // GETS the first question before page load
    const gameId = this.props.gameSessionData.gameId;
    const questionIndex = this.props.teamData.currentQuestion - 1;
    return fetchQuestion(gameId, questionIndex)
      .then(questionData => {
        this.setState({currentQuestion: questionData});
      })
      .catch(errMessage => {
        console.log('ERROR HANDLE HERE, COMPONENT DID MOUNT', errMessage);
      });
  }

  componentDidUpdate(prevProps, prevState){
    // If team has moved on to next question
    if (prevProps.teamData.currentQuestion !== this.props.teamData.currentQuestion) {
      const gameId = this.props.gameSessionData.gameId;
      const questionNumber = this.props.teamData.currentQuestion - 1;
      return fetchQuestion(gameId, questionNumber)
        .then(questionData => {
          this.setState({
            currentQuestion: questionData,
            pointDifference: null
          });
        })
        .catch(errMessage => {
          console.log('ERROR HANDLE HERE, COMPONENT DID UPDATE', errMessage);
        });
    }
    // If team has earned points
    if (prevProps.teamData.points !== this.props.teamData.points) {
      this.setState({
        pointDifference: this.props.teamData.points - prevProps.teamData.points
      });
    }
  }

  skipPlayer = () => {
    this.props.socket.emit('wrongAnswer', {
      teamId: this.props.teamData._id, 
      playerId: this.props.currentUser._id
    })
  }


  checkAnswer = () => {
    const submittedAnswer = document.getElementById('group-solution').value;
    let correctAnswer = checkAnswer(this, submittedAnswer);
    if (correctAnswer) {
      this.props.socket.emit('correctAnswer', {
        teamId: this.props.teamData._id,
        playerId: this.props.currentUser._id
      })
    } else {
      this.props.socket.emit('wrongAnswer', {
        teamId: this.props.teamData._id, 
        playerId: this.props.currentUser._id
      })
    }
  }

  getEquationToDisplay = () => {
    switch (this.props.currentUser.assignedEquationIndex) {
      case(0):
        return this.state.currentQuestion.equation1;
      case(1):
        return this.state.currentQuestion.equation2;
      case(2):
        return this.state.currentQuestion.equation3;
      default:
        return this.state.currentQuestion.equation4;
    }
  }


  render(){
    if (!this.state.currentQuestion) {
      return <Spinner />
    }

    let equationToDisplay = this.getEquationToDisplay();

    // Check to see if all the players have answered
    if (this.props.teamData.players.every(player => player.alreadyGuessed === true)) {
      return <GuessingForPointsMain 
        teamData={this.props.teamData} 
        equationToDisplay={equationToDisplay} 
        currentQuestion={this.state.currentQuestion}
        currentUser={this.props.currentUser}
        socket={this.props.socket}
        pointDifference={this.state.pointDifference}
        />
    }

    return (
      <div>
        <HeaderSubmissionList teamData={this.props.teamData} skipPlayer={this.skipPlayer}/>
        <DisplayQuestion 
          equation={equationToDisplay.equation} 
          numOfTeammates={this.props.teamData.players.length} 
          checkAnswer={this.checkAnswer}
          currentUser={this.props.currentUser}
          />
      </div>
    )
  }
}