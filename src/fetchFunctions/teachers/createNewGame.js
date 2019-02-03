import { SERVER_BASE_URL } from '../../config';

export function createNewGame (title, description) {
  if (!description) {
    description = '- No description';
  }
  const token = localStorage.getItem('authToken');
  const query = `
    mutation {
      createGame (title:"${title}", description:"${description}") {
        id,
        userId,
        title,
        description,
        questions {
          id
        },
        playCount
      }
    }
  `;

  return fetch(`${SERVER_BASE_URL}/graphql/protected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({ query: `${query}` })
  })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        return Promise.reject(response.errors);
      } else {
        const gameData = response.data.createGame;
        return gameData;
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