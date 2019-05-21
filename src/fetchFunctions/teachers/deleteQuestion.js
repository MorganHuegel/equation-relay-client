import { SERVER_BASE_URL } from '../../config';

export function deleteQuestion (gameId, questionId) {
  const token = localStorage.getItem('authToken');
  const query = `
    mutation ($gameId: String, $questionId: String) {
      deleteQuestion (gameId: $gameId, questionId: $questionId) {
        id,
        title,
        description,
        playCount,
        questions {
          id,
          setNumber,
          equation1 {image, equation, answer},
          equation2 {image, equation, answer},
          equation3 {image, equation, answer},
          equation4 {image, equation, answer}
        }
      }
    }
  `;

  const variables = `{
    "gameId": "${gameId}",
    "questionId": "${questionId}"
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
        const updatedGameData = response.data.deleteQuestion;
        return updatedGameData;
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
