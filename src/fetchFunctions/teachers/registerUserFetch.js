import { SERVER_BASE_URL } from '../../config';
import { loginUserFetch } from './loginUserFetch';

export function registerUserFetch (username, password, email) {
  const query = `
    mutation {
      createUser (
        username: "${username}",
        password: "${password}",
        email: "${email}"
      ) {
        id
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
        return loginUserFetch(username, password);
      }
    })
    .catch(err => {
      if (err instanceof Array) { // <---- Graphql error
        return err[0].message;
      } else {
        return "somehow not a graphql error?";
      }
    })
}

