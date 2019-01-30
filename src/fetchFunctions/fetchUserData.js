import { SERVER_BASE_URL } from '../config';

export function fetchUserData (token) {
  const query = `
    query {
      user {
        id,
        username,
        games {
          title,
          description,
          id,
          numOfQuestions
        },
        favorites {
          title
        }
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
      if (response.data.errors) {
        return Promise.reject(response.data.errors);
      } else {
        const userData = response.data.user;
        return userData;
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