import { validateCorrectAnswer } from '../../../fetchFunctions/teachers/validateCorrectAnswer';

export function validateCreateQuestions () {
  const equationInputs = [...document.getElementsByClassName('create-equation-input')];
  const answerInputs = [...document.getElementsByClassName('create-answer-input')];

  // console.log(typeof equationInputs, Array.isArray(equationInputs), equationInputs);
  equationInputs.forEach((equationInput, index) => {
    const value = equationInput.value;

    if (!value) {
      throw new Error('Must have four equations in each set. Check equation number ' + (index + 1));
    }
  })

  answerInputs.forEach((answerInput, index) => {
    const value = answerInput.value;
    if (!value) {
      throw new Error('Must have an answer for each equation. Check answer for equation number ' + (index + 1));
    }

    if (value.match(/[^\d-]/)) {
      throw new Error('Answers must be integers only. Check answer for equation number ' + (index + 1));
    }
  })

  return {
    equation1: {
      image: false,
      equation: document.getElementById('equation1').value,
      answer: Number(document.getElementById('answer1').value)
    },
    equation2: {
      image: false,
      equation: document.getElementById('equation2').value,
      answer: Number(document.getElementById('answer2').value)
    },
    equation3: {
      image: false,
      equation: document.getElementById('equation3').value,
      answer: Number(document.getElementById('answer3').value)
    },
    equation4: {
      image: false,
      equation: document.getElementById('equation4').value,
      answer: Number(document.getElementById('answer4').value)
    }
  }
}



export function valdiateAnswerOnBlur (event, component) {
  let question, answer;
  const input = event.target;
  const inputId = input.id;
  const equationNumber = inputId.slice(-1);

  if (inputId.startsWith('equation')) {
    question = input.value;
    answer = document.getElementById(`answer${equationNumber}`).value;
  } else {
    answer = input.value;
    question = document.getElementById(`equation${equationNumber}`).value
  }

  if (!question || !answer) return;
  component.setState({
    validating: true,
    correct: false,
    incorrect: false,
    couldNotVerify: false,
    message: ''
  }, () => {
    return validateCorrectAnswer({question, answer})
      .then(response => {
        if (response.correct && !response.incorrect) {
          component.setState({
            validating: false,
            correct: true,
            incorrect: false,
            couldNotVerify: false,
            message: ''
          })
          //parent.classList.add('correct');
          //parent.classList.remove('incorrect', 'couldNotVerify')
        } else if (response.incorrect) {
          component.setState({
            validating: false,
            correct: false,
            incorrect: true,
            couldNotVerify: false,
            message: response.message
          })
          //parent.classList.add('incorrect');
          //parent.classList.remove('correct', 'couldNotVerify');
        } else {
          component.setState({
            validating: false,
            correct: false,
            incorrect: false,
            couldNotVerify: true,
            message: response.message
          })
          //parent.classList.add('couldNotVerify');
          //parent.classList.remove('correct', 'incorrect');
        }
      })
  })

}