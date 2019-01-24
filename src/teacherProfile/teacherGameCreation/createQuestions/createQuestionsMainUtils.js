import { validateCreateQuestions } from './validateCreateQuestions';
import { updateQuestionData } from '../../../fetchFunctions/updateQuestionData';
import { createQuestionData } from '../../../fetchFunctions/createQuestionData';


export function changeQuestionSet (questionIndex) {
  try {
    const questionObject = validateCreateQuestions();
    questionObject.gameId = this.props.currentGame.id;
    questionObject.setNumber = this.state.questionIndex + 1;
    const questionId = document.getElementsByClassName('create-questions-main')[0].dataset.questionid;
    return (questionId ? updateQuestionData(questionId, questionObject) : createQuestionData(questionObject))
      .then(updatedQuestion => {
        const copyOfQuestions = [...this.props.currentGame.questions];
        copyOfQuestions.splice(this.state.questionIndex, 1, updatedQuestion);
        //Add question to state
        const newGameData = Object.assign({}, this.props.currentGame, {
          questions: copyOfQuestions
        })
        this.props.setCurrentGame(newGameData)
        this.setState({questionIndex})
      })
      //.catch(errorMessage => this.setState({errorMessage}));
  } catch (err) {
    this.setState({errorMessage: err.message});
  }
}