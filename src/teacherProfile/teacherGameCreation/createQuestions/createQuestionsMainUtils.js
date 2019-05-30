import { validateCreateQuestions } from './validateCreateQuestions';
import { updateQuestionData } from '../../../fetchFunctions/teachers/updateQuestionData';
import { createQuestionData } from '../../../fetchFunctions/teachers/createQuestionData';


export function changeQuestionSetAndSave (questionIndex) {
  try {
    const questionObject = validateCreateQuestions();
    questionObject.gameId = this.props.currentGame.id;
    questionObject.setNumber = this.state.questionIndex + 1;
    const questionId = document.getElementsByClassName('create-questions-main')[0].dataset.questionid;
    return (questionId ? updateQuestionData(questionId, questionObject) : createQuestionData(questionObject))
      .then(updatedQuestion => {
        const copyOfQuestions = [...this.props.currentGame.questions];
        if (questionId) {
          copyOfQuestions.splice(this.state.questionIndex, 1, updatedQuestion); //Replace old question in state
        } else {
          copyOfQuestions.push(updatedQuestion); //Append new question to state
        }
        const newGameData = Object.assign({}, this.props.currentGame, {
          questions: copyOfQuestions
        })
        this.props.setCurrentGame(newGameData)
        this.setState({questionIndex, errorMessage: ''})
      })
      .catch(errorMessage => {
        this.setState({errorMessage});
      });
  } catch (err) {
    this.setState({errorMessage: err.message});
  }
}

export function checkIfQuestionChanged () {
  if (!this.props.currentGame.questions[this.state.questionIndex]) {
    return true;
  }

  const equationInputs = [...document.getElementsByClassName('create-equation-input')];
  const answerInputs = [...document.getElementsByClassName('create-answer-input')];

  let changed = false;

  equationInputs.forEach( (equationInputField, index) => {
    const savedInput = this.props.currentGame.questions[this.state.questionIndex][`equation${index + 1}`].equation;
    const currentInput = equationInputField.value;
    if (savedInput !== currentInput) {
      changed = true;
    }
  })

  answerInputs.forEach( (answerInputField, index) => {
    const savedInput = this.props.currentGame.questions[this.state.questionIndex][`equation${index + 1}`].answer;
    const currentInput = Number(answerInputField.value);
    if (savedInput !== currentInput) {
      changed = true;
    }
  })

  return changed;
}