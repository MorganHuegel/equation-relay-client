import { SERVER_BASE_URL } from '../../config';
import io from 'socket.io-client';


export function teacherSetupSocket (component) {
  const socket = io(SERVER_BASE_URL, {
    forceNew: true,
    query: {
      sessionCode: component.props.sessionCode
    }
  });

  component.socket = socket;
  socket.on('playerJoin', (updatedGameSession) => {
    const newGameState = Object.assign({}, updatedGameSession, {
      playerList: [...updatedGameSession.playerList]
    })
    component.setState({gameSession: newGameState})
  });
  socket.on('playerRemoved', (updatedGameSession) => {
    const newGameState = Object.assign({}, updatedGameSession, {
      playerList: [...updatedGameSession.playerList]
    })
    component.setState({gameSession: newGameState})
  })
  socket.on('nextQuestion', (updatedGameData) => {
    if (updatedGameData) {
      component.setState({gameSession: updatedGameData})
    }
  });
  socket.on('error', (errMessage) => console.log(errMessage))
}


export function teacher_ShuffleTeams (socket, component) {
  socket.on('shuffleTeams', gameSessionData => {
    component.setState({
      gameSession: gameSessionData
    });
  })
  socket.emit('shuffleTeams');
}

export function teacher_startGame (socket, component) {
  socket.on('startGame', updatedGame => {
    if (updatedGame) {
      component.setState({
        gameSession: updatedGame
      })
    }
  })
  socket.emit('startGame');
  //ALSO LISTEN FOR TEAMS SCORING
  socket.on('teamScored', (gameSessionData) => component.setState({gameSession: gameSessionData}));
}

export function teacher_EndGame (socket, component) {
  socket.on('endGame', deletedGameData => {
    component.setState({
      gameSession: deletedGameData
    })
  });
  socket.emit('endGame');
}