import React from 'react';

export function QuestionNavigatorMain (props) {
  const questionList = props.currentGame.questions.map((question, index) => {
    return (
      <li class='question-navigator-item' key={question.setNumber}>
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