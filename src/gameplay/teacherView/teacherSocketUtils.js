import { SERVER_BASE_URL } from '../../config';
import io from 'socket.io-client';


export function teacherGameplayMainWillMount (component) {
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
  socket.on('error', (errMessage) => console.log(errMessage))
}


export function teacher_StartGame (socket, component) {
  socket.on('startGame', gameSessionData => {
    component.setState({
      gameSession: gameSessionData
    });
  })
  socket.emit('startGame');
}
