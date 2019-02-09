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


export function player_OnPlayerJoin (newPlayerList, component) {
  const gameSessionData = Object.assign({}, component.state, {
    playerList: [...newPlayerList]
  })

  component.setState({gameSession: gameSessionData})
}