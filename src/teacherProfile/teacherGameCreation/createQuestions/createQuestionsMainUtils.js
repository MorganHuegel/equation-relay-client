import { validateCreateQuestions } from './validateCreateQuestions';
import { updateQuestionData } from '../../../fetchFunctions/updateQuestionData';
import { createQuestionData } from '../../../fetchFunctions/createQuestionData';


export function changeQuestionSet (questionIndex) {
  try {
    const questionObject = validateCreateQuestions();
    questionObject.gameId = this.props.currentGame.id;
    questionObject.setNumber = this.state.questionIndex + 1;
    const questionId = document.getElementsByClassName('create-questions-main')[0].dataset.questionid;
    const fetchFunction = questionId ? updateQuestionData : createQuestionData;
    return fetchFunction(questionId, questionObject)
      .then(updatedQuestion => {
        console.log('SUCCESS ->>>>>',updatedQuestion);
        if (questionId) {
          //Replace old question in state
          
        } else {
          //Add question to state
          const newGameData = Object.assign({}, this.props.currentGame, {
            questions: [...this.props.currentGame.questions, newGameData]
          })
          this.props.setCurrentGame(newGameData)
        }
      })
      .catch(errorMessage => this.setState({errorMessage}));
    this.setState({questionIndex})
  } catch (err) {
    this.setState({errorMessage: err.message});
  }
}