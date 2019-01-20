import React from 'react';

import { NewEquationInput } from './newEquationInput';

export class CreateQuestionsMain extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      questionIndex: 0,
      errorMessage: ''
    }
  }

  
  changeQuestionSet = (questionSetNumber) => {
    //VALIDATE
    //UPDATE
  }


  render(){
    const questionSetLength = this.props.currentGame.questions.length || 1;
    let currentQuestion = this.props.currentGame.questions[this.state.questionIndex];

    let equationSet;
    if (currentQuestion) {
      equationSet = [1, 2, 3, 4].map(num => {
        const answer = currentQuestion[`equation${num}`].answer;
        const equation = currentQuestion[`equation${num}`].question;
        return <NewEquationInput equationNum={num} key={num} equation={equation} answer={answer}/>
      })
    } else {
      equationSet = [1, 2, 3, 4].map(num => <NewEquationInput equationNum={num} key={num}/>);
    }

    const previousButton = this.state.questionIndex === 0 ? null : 
      <button type='button' onClick={() => this.setState({questionIndex: this.state.questionIndex - 1})}>Previous Question</button>;

    return (
      <div className='create-questions-main'>
        <h2>{this.props.currentGame.title}</h2>
        <p>{this.state.errorMessage}</p>
        <h3>Equation Set {this.state.questionIndex + 1} of {questionSetLength}</h3>
        {equationSet}
        <button type='button' onClick={() => this.props.setCurrentGame(null)}>Cancel</button>
        {previousButton}
        <button type='button'>Next Question</button>
        <button type='button'>Finished</button>
      </div>
    )
  }
}