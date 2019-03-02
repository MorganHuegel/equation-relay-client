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

export function player_StartGame (gameSessionData, component) {
  if (gameSessionData) {
    component.setState({gameSession: gameSessionData});
  }
}

export function player_NextQuestion (gameSessionData, component) {
  if (!gameSessionData) {
    return;
  }

  console.log('GAME SESSION DATA:', gameSessionData);
  const userTeam = gameSessionData.teamList.find(team => team._id === component.state.currentTeam._id);
  // If its the player's own team being updated
  if (userTeam.currentQuestion !== component.state.currentTeam.currentQuestion) {
    const updatedPlayer = userTeam.players.find(player => player._id === component.state.currentUser._id);
    component.setState({
      currentUser: updatedPlayer,
      currentTeam: userTeam, 
      gameSession: gameSessionData, 
      errorMessage: null})
  }
  // If its a different team being updated
  else {
    component.setState({gameSession: gameSessionData});
  }
}

export function player_EndGame (deletedGameSessionData, component) {
  component.setState({gameSession: deletedGameSessionData});
}

