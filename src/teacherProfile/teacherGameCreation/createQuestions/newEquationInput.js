import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/newEquationInput.css';

export function NewEquationInput (props) {
  const equationValue = (props.equation || props.equation === 0) ? props.equation : '';
  const answerValue = (props.answer || props.answer === 0) ? props.answer : '';
  
  return (
    <fieldset className='new-equation-input'>
      <legend>Question {props.equationNum}</legend>

      <label htmlFor={`equation${props.equationNum}`}>Equation:</label>
      <input 
        defaultValue={equationValue}
        type='text' 
        name={`equation${props.equationNum}`} 
        id={`equation${props.equationNum}`}
        placeholder={'e.g. 2x + 1 = 7'}
        className='create-equation-input'
        />

      <label htmlFor={`answer${props.equationNum}`}>Answer:</label>
      <input 
        defaultValue={answerValue}
        type='number'
        min='-10'
        name={`answer${props.equationNum}`} 
        id={`answer${props.equationNum}`}
        className='create-answer-input'
        />
    </fieldset>
  )
}