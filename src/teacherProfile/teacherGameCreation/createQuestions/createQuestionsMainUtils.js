import { validateCreateQuestions } from './validateCreateQuestions';
import { updateQuestionData } from '../../../fetchFunctions/updateQuestionData';
import { createQuestionData } from '../../../fetchFunctions/createQuestionData';


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
        this.setState({questionIndex})
      })
  } catch (err) {
    this.setState({errorMessage: err.message});
  }
}