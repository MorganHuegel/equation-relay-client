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


export function player_OnPlayerJoin (gameSessionData, username, component) {
  const newCurrentUser = {
    handle: username,
    captain: false
  }
  component.setState({
    gameSession: gameSessionData,
    currentUser: newCurrentUser
  })
}