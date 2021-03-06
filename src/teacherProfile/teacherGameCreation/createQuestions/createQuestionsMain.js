import React from 'react';

import '../../../stylesheets/teacherProfile/teacherGameCreation/createQuestionsMain.css';

import { NewEquationInput } from './newEquationInput';

import { fetchUserData } from '../../../fetchFunctions/teachers/fetchUserData';
import { deleteQuestion } from '../../../fetchFunctions/teachers/deleteQuestion';
import { changeQuestionSetAndSave, checkIfQuestionChanged } from './createQuestionsMainUtils';
import { QuestionNavigatorMain } from './questionNavigatorMain';
import { ConfirmNoSaveQuestion } from './confirmNoSaveQuestion';

export class CreateQuestionsMain extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      questionIndex: 0,
      errorMessage: '',
      confirmNoSave: false
    }

    this.changeQuestionSetAndSave = changeQuestionSetAndSave.bind(this);
    this.checkIfQuestionChanged = checkIfQuestionChanged.bind(this);
  }


  componentWillUnmount () {
    const token = localStorage.getItem('authToken');
    if (token) {
      return fetchUserData(token)
        .then(userData => {
          this.props.updateUserData(userData);
        })
        .catch(e => console.log('Could not update user data.'))
    }
  }


  deleteQuestion = () => {
    // If user clicks delete when there are no questions saved yet
    if (this.props.currentGame.questions.length === 0) {
      return;
    // If user clicks delete on a question that has not been saved yet
    } else if (this.state.questionIndex >= this.props.currentGame.questions.length) {
      return this.changeQuestionsNoSave(this.state.questionIndex - 1);
    }

    const gameId = this.props.currentGame.id;
    const questionId = this.props.currentGame.questions[this.state.questionIndex].id;
    return deleteQuestion(gameId, questionId)
      .then(updatedGameData => {
        const newQuestionIndex = this.state.questionIndex >= 1 ? this.state.questionIndex - 1 : 0;
        return this.setState({questionIndex: newQuestionIndex}, () => {
          this.props.setCurrentGame(updatedGameData);
        })
      })
      .catch(errorMessage => {
        console.log('ERROR HANDLE HERE: ', errorMessage)
        this.setState({ errorMessage })
      })
  }


  toggleConfirmNoSave = (indexNum) => {
    const changedInputs = this.checkIfQuestionChanged();

    if (changedInputs && !(indexNum === this.state.questionIndex)) {
      this.setState({confirmNoSave: indexNum});
    } else if (indexNum === 'finish') {
      this.props.setCurrentGame(null);
    } else {
      this.changeQuestionsNoSave(indexNum);
    }
  }


  changeQuestionsNoSave = (questionIndex = this.state.confirmNoSave) => {
    if (questionIndex === 'finish') {
      this.props.setCurrentGame(null);
    } else {
      this.setState({questionIndex, errorMessage: '', confirmNoSave: false});
    }
  }


  render(){
    let questionSetLength = this.props.currentGame.questions.length || 1;
    if (this.state.questionIndex === questionSetLength) {
      questionSetLength++;
    }
    let currentQuestion = this.props.currentGame.questions[this.state.questionIndex];

    let equationSet;
    if (currentQuestion) {
      equationSet = [1, 2, 3, 4].map(num => {
        const answer = currentQuestion[`equation${num}`].answer;
        const equation = currentQuestion[`equation${num}`].equation;
        return <NewEquationInput equationNum={num} key={num.toString() + this.state.questionIndex.toString() + currentQuestion.id} equation={equation} answer={answer}/>
      })
    } else {
      equationSet = [1, 2, 3, 4].map(num => <NewEquationInput equationNum={num} key={num.toString() + this.state.questionIndex.toString()}/>);
    }

    const confirmDeleteLightbox = <ConfirmNoSaveQuestion 
      confirmNoSave={this.state.confirmNoSave} 
      questionNumber={this.state.questionIndex + 1} 
      toggleConfirmNoSave={this.toggleConfirmNoSave}
      changeQuestionsNoSave={this.changeQuestionsNoSave}/>

    const previousButton = this.state.questionIndex === 0 ? null : 
      <button type='button' className='previous-question' onClick={() => this.toggleConfirmNoSave(this.state.questionIndex - 1)}>Previous Question</button>;

    return (
      <div className='create-questions-main' data-questionid={currentQuestion ? currentQuestion.id : null}>
        { confirmDeleteLightbox }

        <QuestionNavigatorMain 
          currentGame={this.props.currentGame} 
          toggleConfirmNoSave={this.toggleConfirmNoSave} 
          changeQuestionsNoSave={this.changeQuestionsNoSave} 
          questionIndex={this.state.questionIndex}/>

        <h2>{this.props.currentGame.title}</h2>
        <p className='error-message'>{this.state.errorMessage}</p>
        <h3>
          Equation Set {this.state.questionIndex + 1} of {questionSetLength}
          <button type='button' id='delete-button' onClick={() => this.deleteQuestion()}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </h3>

        {equationSet}

        <button type='reset' onClick={() => this.toggleConfirmNoSave('finish')}>Finish</button>
        <span className='float-right-container'>
          {previousButton}
          <button type='button' className='next-question' onClick={() => this.changeQuestionSetAndSave(this.state.questionIndex + 1)}>
            Save {'&'} Next Question
          </button>
        </span>

      </div>
    )
  }
}