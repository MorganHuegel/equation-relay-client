import { SERVER_BASE_URL } from '../../config';

export function sendJoinCode(joinCode) {
  return fetch(`${SERVER_BASE_URL}/checkGameSession/${joinCode}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status !== 200) {
        return res.json().then(err => Promise.reject(err));
      }
      return res.json();
    })
    .then(sessionData => {
      if (sessionData.error) {
        return Promise.reject(sessionData);
      }
    })
    .catch(err => {
      if (err.message) {
        return Promise.reject(err)
      } else {
        return Promise.reject({message: 'System error. Please try again.'})
      }
    })
}