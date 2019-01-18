import { SERVER_BASE_URL } from '../config';

export function fetchUserData (token) {
  const query = `
    query {
      user {
        id,
        username,
        games {
          title,
          id
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
      if (response.errors) {
        return Promise.reject(response.errors);
      } else {
        const userData = response.data.user;
        return userData;
      }
    })
    .catch(err => {
      if (err instanceof Array) { // <-- Graphql error list
        const errorMessage = err[0].message;
        return errorMessage;
      } else {
        return "Somehow not a graphql error??";
      }
    })
}