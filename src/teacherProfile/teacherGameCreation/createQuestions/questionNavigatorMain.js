import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/questionNavigatorMain.css';

export function QuestionNavigatorMain (props) {
  let numOfQuestions = props.questionIndex === props.currentGame.questions.length ?
    props.questionIndex + 1 :
    props.currentGame.questions.length;

  let questionList = [];
  for (let i = 0; i < numOfQuestions; i++) {
    let itemClass = 'question-navigator-item';
    if (i === props.questionIndex) {
      itemClass += ' current';
    }

    let questionId = props.currentGame.questions[i] ? props.currentGame.questions[i].id : 'new';
    questionList.push(
      <li className={itemClass} key={questionId}>
        <button type='button' onClick={() => props.changeQuestionsNoSave(i)}>{i + 1}</button>
      </li>
    )
  }
  // const questionList = props.currentGame.questions.map((question, index) => {
  //   let itemClass = 'question-navigator-item';
  //   if (props.questionIndex === index) {
  //     itemClass += ' current';
  //   }

  //   return (
  //     <li className={itemClass} key={question.id}>
  //       <button type='button' onClick={() => props.changeQuestionsNoSave(index)}>{index + 1}</button>
  //     </li>
  //   )
  // })
  
  return (
    <ul className='question-navigator-list'>
      {questionList}
    </ul>
  )
}