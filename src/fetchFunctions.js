import { SERVER_BASE_URL } from './config';

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

  return fetch(`${SERVER_BASE_URL}/graphql?query=${query}`, {
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
        // TO-DO: Call login fetch function
        console.log('RESPONSE: ', response);
      }
    })
    .catch(err => {
      // TO-DO: Set state of error message
      console.log('ERROR:', err);
    })
}

export function loginUserFetch (username, password, email) {
  
}