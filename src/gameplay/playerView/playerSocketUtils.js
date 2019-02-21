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
  //UPDATE GAMESESSION AND CURRENT USER IN STATE
  const newCurrentUser = gameSessionData.playerList.find(player => player.handle === username);

  component.setState({
    errorMessage: '',
    gameSession: gameSessionData,
    currentUser: newCurrentUser
  })
}


export function player_ShuffleTeams (gameSessionData, component) {
  //UPDATE GAMESESSION AND CURRENT TEAM IN STATE
  const currentTeam = gameSessionData.teamList.find(team => {
    return team.players.find(player => player.handle === component.state.currentUser.handle);
  })

  component.setState({
    currentTeam: currentTeam,
    gameSession: gameSessionData
  })
}