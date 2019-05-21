import { SERVER_BASE_URL } from '../../config';

export function validateCorrectAnswer (questionObject) {
  const token = localStorage.getItem('authToken');

  return fetch(`${SERVER_BASE_URL}/checkAnswer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(questionObject)
  })
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(res.json());
      }
      return res.json()
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log('ERROR FROM VALIDATE CORRECT ANSWER: ', err);
      return Promise.reject(err);
    })
}
