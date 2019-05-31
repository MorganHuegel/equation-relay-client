import React from 'react';
import Spinner from 'react-spinkit';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/liveGamePlayingMain.css';

import { HeaderSubmissionList } from './headerSubmissionList';
import { DisplayQuestion } from './displayQuestion';
import { GuessingForPointsMain } from './guessingForPointsMain';
import { TeamFinishedScreen } from './teamFinishedScreen';

import { fetchQuestion } from '../../../fetchFunctions/players/fetchQuestion';
import { checkAnswer } from './checkAnswerUtil';

export class LiveGamePlayingMain extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentQuestion: null,
      pointDifference: null,
      finished: false,
      errorMessage: null
    }
  }

  componentWillMount(){
    //Will update gameSession data before it mounts
    this.props.socket.emit('nextQuestion', {
      teamId: this.props.teamData._id, 
      playerId: this.props.currentUser._id
    });
  }


  componentDidUpdate(prevProps, prevState){
    // If team has moved on to next question (also gets called after page mounts)
    if (prevProps.teamData.currentQuestion !== this.props.teamData.currentQuestion) {
      const gameId = this.props.gameSessionData.gameId;
      const questionNumber = this.props.teamData.currentQuestion - 1;
      return fetchQuestion(gameId, questionNumber)
        .then(questionData => {
          if (questionData) {
            this.setState({
              currentQuestion: questionData,
              pointDifference: null,
              errorMessage: null
            });
          } else {
            console.log('Out of questions!')
            this.setState({
              finished: true,
              errorMessage: null
            })
          }
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


  setToLoading = () => {
    this.setState({currentQuestion: null});
  }


  skipPlayer = (playerId) => {
    this.props.socket.emit('wrongAnswer', {
      teamId: this.props.teamData._id, 
      playerId
    })
  }


  checkAnswer = () => {
    const submittedAnswer = document.getElementById('group-solution').value;
    if (!submittedAnswer || isNaN(Number(submittedAnswer))) {
      return this.setState({errorMessage: 'Your answer must be a number.'})
    }
    let correctAnswer = checkAnswer(this, submittedAnswer);
    if (correctAnswer) {
      this.props.socket.emit('correctAnswer', {
        teamId: this.props.teamData._id,
        playerId: this.props.currentUser._id,
        errorMessage: null
      })
    } else {
      this.props.socket.emit('wrongAnswer', {
        teamId: this.props.teamData._id, 
        playerId: this.props.currentUser._id,
        errorMessage: null
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
    if (this.state.finished) {
      return <TeamFinishedScreen teamData={this.props.teamData}/>
    }
    
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
        setToLoading={this.setToLoading}
        />
    }

    return (
      <div className='live-game-playing-main'>
        <HeaderSubmissionList teamData={this.props.teamData} skipPlayer={this.skipPlayer}/>
        <DisplayQuestion 
          equation={equationToDisplay.equation} 
          numOfTeammates={this.props.teamData.players.length} 
          checkAnswer={this.checkAnswer}
          currentUser={this.props.currentUser}
          errorMessage={this.state.errorMessage}
          />
      </div>
    )
  }
}