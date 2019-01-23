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

    if (value.match(/\D/)) {
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