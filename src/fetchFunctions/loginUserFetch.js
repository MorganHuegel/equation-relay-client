import { SERVER_BASE_URL } from '../config';

export function loginUserFetch (username, password) {
  const query = `
    mutation {
      loginUser (
        username: "${username}",
        password: "${password}"
      )
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
        const token = response.data.loginUser;
        localStorage.setItem('authToken', token);
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