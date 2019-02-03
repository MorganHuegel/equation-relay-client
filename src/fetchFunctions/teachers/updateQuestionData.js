import { SERVER_BASE_URL } from '../../config';

export function updateQuestionData (questionId, questionObject) {
  const token = localStorage.getItem('authToken');
  const query = `
    mutation ($questionObject : QuestionInput, $questionId : String){
      updateQuestion (questionId : $questionId, questionObject : $questionObject) {
        id,
        gameId,
        setNumber,
        equation1 {image, equation, answer},
        equation2 {image, equation, answer},
        equation3 {image, equation, answer},
        equation4 {image, equation, answer}
      }
    }
  `;
  const variables = `{
    "questionId": "${questionId}",
    "questionObject": ${JSON.stringify(questionObject)}
  }`
  

  return fetch(`${SERVER_BASE_URL}/graphql/protected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({ query, variables })
  })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        return Promise.reject(response.errors);
      } else {
        const questionData = response.data.updateQuestion;
        return questionData;
      }
    })
    .catch(err => {
      if (err instanceof Array) { // <-- Graphql error list
        const errorMessage = err[0].message;
        return Promise.reject(errorMessage);
      } else {
        return Promise.reject("Somehow not a graphql error??");
      }
    })
}
