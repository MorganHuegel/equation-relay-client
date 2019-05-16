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
  if (!component.state.currentUser) return component.setState({errorMessage: 'Gotta be quicker than that!  You didn\'t join in time.'})
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

  const userTeam = gameSessionData.teamList.find(team => team._id === component.state.currentTeam._id);
  // If its the player's own team being updated
  if (userTeam.currentQuestion !== component.state.currentTeam.currentQuestion) {
    const updatedPlayer = userTeam.players.find(player => player._id === component.state.currentUser._id);
    component.setState({
      currentUser: updatedPlayer,
      currentTeam: userTeam, 
      gameSession: gameSessionData, 
      errorMessage: null
    })
  }
  // If its a different team being updated
  else {
    component.setState({gameSession: gameSessionData});
  }
}



export function player_EndGame (deletedGameSessionData, component) {
  component.setState({gameSession: deletedGameSessionData});
}



export function player_HandleAnswer (gameSessionData, component) {
  const userTeam = gameSessionData.teamList.find(team => team._id === component.state.currentTeam._id);
  const updatedPlayer = userTeam.players.find(player => player._id === component.state.currentUser._id);
  // If the user is the one who got updated
  if (updatedPlayer.alreadyGuessed !== component.state.currentUser.alreadyGuessed) {
    component.setState({
      currentUser: updatedPlayer,
      currentTeam: userTeam,
      gameSession: gameSessionData,
      errorMessage: null
    })
  } 
  // If another player was the one who got updated
  else {
    component.setState({
      currentTeam: userTeam,
      gameSession: gameSessionData
    });
  }
}



export function player_TeamScored (gameSessionData, component) {
  const team = gameSessionData.teamList.find(team => team._id === component.state.currentTeam._id);
  // If points were updated, their own team must have scored
  if (team.points !== component.state.currentTeam.points) {
    component.setState({
      currentTeam: team,
      gameSession: gameSessionData
    })
  } 
  // Otherwise, must have been a different team who scored
  else {
    component.setState({gameSession: gameSessionData});
  }
}


export function player_AssignGuesser (gameSessionData, component) {
  //if player has changed, then update CurrentUser in state
  const team = gameSessionData.teamList.find(team => team._id === component.state.currentTeam._id);
  const player = team.players.find(player => player._id === component.state.currentUser._id);
  if (player.guessingForPoints) {
    component.setState({
      currentUser: player,
      currentTeam: team,
      gameSession: gameSessionData
    })
  } else if (team.players.some(player => player.guessingForPoints)) {
    component.setState({
      currentTeam: team,
      gameSession: gameSessionData
    })
  } else {
    component.setState({
      gameSession: gameSessionData
    })
  }
}


export function player_Removed (gameSessionData, component) {
  // If it was the current player that was removed
  if (!gameSessionData.playerList.find(player => {
    return player._id.toString() === component.state.currentUser._id
  })) {
    return component.redirectToJoinLanding(true);
  }

  // If it was the current player's teammate that was removed
  const playerTeam = gameSessionData.teamList.find(team => team._id.toString() === component.state.currentTeam._id);
  if (playerTeam.players.length !== component.state.currentTeam.length) {
    return component.setState({
      gameSession: gameSessionData,
      currentTeam: playerTeam
    })
  }
  // const playerTeam = gameSessionData.teamList.find(team => team._id.toString() === component.state.currentTeam._id);
  // console.log('PLAYER TEAM: ', playerTeam)
  // console.log('PLAYER TEAM LENGTH: ', playerTeam.players.length, 'STATE TEAM LENGTH: ', component.state.currentTeam.players.length)
  // let currentTeamChanged = false;
  // if (playerTeam) {
  //   playerTeam.players.forEach(teammate => {
  //     console.log('FOR EACH: ', teammate._id, teammate._id.toString())
  //     console.log('FIND PLAYER:', gameSessionData.playerList.find(player => player._id.toString() === teammate._id.toString()))
  //     if (!gameSessionData.playerList.find(player => player._id.toString() === teammate._id.toString())) {
  //       currentTeamChanged = true;
  //     }
  //   })
  //   console.log('CURRENT TEAM CHANGED: ', currentTeamChanged)
  //   if (currentTeamChanged) {
  //     return component.setState({
  //       gameSession: gameSessionData,
  //       currentTeam: playerTeam
  //     })
  //   } 
  // }

  // If it was a non-teammate that was removed
  return component.setState({
    gameSession: gameSessionData
  })
}