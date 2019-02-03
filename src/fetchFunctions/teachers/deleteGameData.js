import { SERVER_BASE_URL } from '../../config';

export function deleteGameData (gameId) {
  const token = localStorage.getItem('authToken');
  const query = `
    mutation {
      deleteGame (gameId:"${gameId}")
    }
  `;

  return fetch(`${SERVER_BASE_URL}/graphql/protected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({ query })
  })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        return Promise.reject(response.errors);
      } else {
        const successMessage = response.data.deleteGame;
        return successMessage;
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