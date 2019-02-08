const { SERVER_BASE_URL } = require('../../config');
const io = require('socket.io-client')

export function initialConnect (sessionCode) {
  const socket = io(SERVER_BASE_URL, {
    forceNew: true,
    query: {
      sessionCode: sessionCode
    }
  });

  return socket;
}