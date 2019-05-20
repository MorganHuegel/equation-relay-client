import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/newEquationInput.css';

import { valdiateAnswerOnBlur } from './validateCreateQuestions';

export class NewEquationInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      validating: false,
      correct: false,
      incorrect: false,
      couldNotVerify: false,
      message: ''
    }
  }

  render () {
    const equationValue = (this.props.equation || this.props.equation === 0) ? this.props.equation : '';
    const answerValue = (this.props.answer || this.props.answer === 0) ? this.props.answer : '';
    
    let classToApply, verifyIcon;
    switch(true){
      case(this.state.validating):
        classToApply = '';
        verifyIcon = '...validating...';
        break;
      case (this.state.correct):
        classToApply = 'correct';
        verifyIcon = '...correct...';
        break;
      case (this.state.incorrect):
        classToApply = 'incorrect';
        verifyIcon = '...incorrect...';
        break;
      case (this.state.couldNotVerify):
        classToApply = 'couldNotVerify';
        verifyIcon = '...couldNotVerify...';
        break;
      default:
        classToApply = '';
        verifyIcon = '';
    }

    return (
      <fieldset className={`new-equation-input ${classToApply}`}>
        <legend>Question {this.props.equationNum}<span className='verify-icon'>{verifyIcon}</span></legend>

        <label htmlFor={`equation${this.props.equationNum}`}>Equation:</label>
        <input 
          onBlur={event => valdiateAnswerOnBlur(event, this)}
          defaultValue={equationValue}
          type='text' 
          name={`equation${this.props.equationNum}`} 
          id={`equation${this.props.equationNum}`}
          placeholder={'e.g. 2x + 1 = 7'}
          className='create-equation-input'
          />

        <label htmlFor={`answer${this.props.equationNum}`}>Answer:</label>
        <input 
          onBlur={event => valdiateAnswerOnBlur(event, this)}
          defaultValue={answerValue}
          type='number'
          name={`answer${this.props.equationNum}`} 
          id={`answer${this.props.equationNum}`}
          className='create-answer-input'
          />

          <p className='error-message'>{this.state.message}</p>
      </fieldset>
    )
  }
}