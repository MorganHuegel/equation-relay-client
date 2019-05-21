import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/questionNavigatorMain.css';

export function QuestionNavigatorMain (props) {
  const questionList = props.currentGame.questions.map((question, index) => {
    let itemClass = 'question-navigator-item';
    if (props.questionIndex === index) {
      itemClass += ' current';
    }

    return (
      <li className={itemClass} key={question.id}>
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