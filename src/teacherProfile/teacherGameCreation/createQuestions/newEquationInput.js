import React from 'react';

export function NewEquationInput (props) {
  const equationValue = props.equation || '';
  const answerValue = props.answer || '';
  
  return (
    <div className='new-equation-input'>
      <label>Equation {props.equationNum}</label>
      <input 
        defaultValue={equationValue}
        type='text' 
        name={`equation${props.equationNum}`} 
        id={`equation${props.equationNum}`}
        placeholder={'e.g. 2x + 1 = 7'}
        />

      <input 
        defaultValue={answerValue}
        type='number'
        name={`answer${props.equationNum}`} 
        id={`answer${props.equationNum}`}
        />
    </div>
  )
}