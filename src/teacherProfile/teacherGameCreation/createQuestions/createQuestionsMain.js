import React from 'react';

import { NewEquationInput } from './newEquationInput';

import { fetchUserData } from '../../../fetchFunctions/teachers/fetchUserData';
import { changeQuestionSetAndSave } from './createQuestionsMainUtils';
import { QuestionNavigatorMain } from './questionNavigatorMain';

export class CreateQuestionsMain extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      questionIndex: 0,
      errorMessage: ''
    }

    this.changeQuestionSetAndSave = changeQuestionSetAndSave.bind(this);
  }

  componentWillUnmount () {
    const token = localStorage.getItem('authToken');
    if (token) {
      return fetchUserData(token)
        .then(userData => {
          this.props.updateUserData(userData);
        })
        .catch(e => console.log('Could not update user data.'))
    }
  }

  changeQuestionsNoSave = (questionIndex) => {
    this.setState({questionIndex, errorMessage: ''});
  }

  render(){
    let questionSetLength = this.props.currentGame.questions.length || 1;
    if (this.state.questionIndex === questionSetLength) {
      questionSetLength++;
    }
    let currentQuestion = this.props.currentGame.questions[this.state.questionIndex];

    let equationSet;
    if (currentQuestion) {
      equationSet = [1, 2, 3, 4].map(num => {
        const answer = currentQuestion[`equation${num}`].answer;
        const equation = currentQuestion[`equation${num}`].equation;
        return <NewEquationInput equationNum={num} key={num.toString() + this.state.questionIndex.toString()} equation={equation} answer={answer}/>
      })
    } else {
      equationSet = [1, 2, 3, 4].map(num => <NewEquationInput equationNum={num} key={num.toString() + this.state.questionIndex.toString()}/>);
    }

    const previousButton = this.state.questionIndex === 0 ? null : 
      <button type='button' onClick={() => this.changeQuestionSetAndSave(this.state.questionIndex - 1)}>Previous Question</button>;

    return (
      <div className='create-questions-main' data-questionid={currentQuestion ? currentQuestion.id : null}>
        <QuestionNavigatorMain currentGame={this.props.currentGame} changeQuestionsNoSave={this.changeQuestionsNoSave} questionIndex={this.state.questionIndex}/>
        <h2>{this.props.currentGame.title}</h2>
        <p>{this.state.errorMessage}</p>
        <h3>Equation Set {this.state.questionIndex + 1} of {questionSetLength}</h3>
        {equationSet}
        <button type='reset' onClick={() => this.props.setCurrentGame(null)}>Finish</button>
        {previousButton}
        <button type='button' onClick={() => this.changeQuestionSetAndSave(this.state.questionIndex + 1)}>Next Question</button>
      </div>
    )
  }
}