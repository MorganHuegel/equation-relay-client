import { SERVER_BASE_URL } from '../config';

export function fetchGameData (gameId) {
  const query = `
    query {
      game (gameId:"${gameId}"){
        id,
        title,
        description,
        playCount,
        questions {
          id,
          equation1 {image, equation, answer},
          equation2 {image, equation, answer},
          equation3 {image, equation, answer},
          equation4 {image, equation, answer}
        }
      }
    }
  `;

  return fetch(`${SERVER_BASE_URL}/graphql/unprotected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query: `${query}` })
  })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        return Promise.reject(response.errors);
      } else {
        const gameData = response.data.game;
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