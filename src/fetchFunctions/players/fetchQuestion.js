import { SERVER_BASE_URL } from '../../config';

export function fetchQuestion (gameId, questionNumber) {
  const query = `
    query {
      question(gameId:"${gameId}", questionIndex:${questionNumber - 1}) {
        id,
        equation1 {
          image,
          equation,
          answer
        },
        equation2 {
          image,
          equation,
          answer
        },
        equation3 {
          image,
          equation,
          answer
        },
        equation4 {
          image,
          equation,
          answer
        }
      }
    }
  `;

  return fetch(`${SERVER_BASE_URL}/graphql/unprotected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query: `${query}` })
  })
    .then(res => res.json())
    .then(response => {
      console.log('RESPONSE',response);
      if (response.data && response.data.errors) {
        console.log('IN FIRST ELSE')
        return Promise.reject(response.data.errors);
      } else if (response.errors) {
        console.log('IN SECOND ELSE')
        return Promise.reject(response.errors);
      } else {
        console.log('IN THRID ELSE')
        const questionData = response.data.question;
        return questionData;
      }
    })
    .catch(err => {
      console.log('ERROR RETURNED',err, err instanceof Array)
      if (err instanceof Array) { // <-- Graphql error list
        const errorMessage = err[0].message;
        return Promise.reject(errorMessage);
      } else {
        return Promise.reject("Somehow not a graphql error??");
      }
    })
}