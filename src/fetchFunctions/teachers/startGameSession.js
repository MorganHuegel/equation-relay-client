import { SERVER_BASE_URL } from '../../config';

export function startGameSession(gameId){
  const token = localStorage.getItem('authToken');

  const query = `
    mutation {
      startGameSession (gameId: "111111111111111111111110")
    }
  `

  return fetch(`${SERVER_BASE_URL}/graphql/protected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
    body: JSON.stringify({query})
  })
  .then(res => res.json())
  .then(res => {
    if (res.errors) {
      return Promise.reject(res.errors);
    } else {
      return res.data.startGameSession;
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