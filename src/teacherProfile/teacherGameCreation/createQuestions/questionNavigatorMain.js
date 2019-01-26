import React from 'react';

export function QuestionNavigatorMain (props) {
  const questionList = props.currentGame.questions.map((question, index) => {
    console.log(question);
    return (
      <li className='question-navigator-item' key={"set" + question.setNumber}>
        <button type='button' onClick={() => props.changeQuestionsNoSave(index)}>{index + 1}</button>
      </li>
    )
  })
  return (
    <ul className='question-navigator-list'>
      {questionList}
    </ul>
  )
}