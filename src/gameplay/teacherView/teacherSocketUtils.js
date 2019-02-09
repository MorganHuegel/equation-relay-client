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
  socket.on('playerJoin', (updatedPlayerList) => {
    const newGameState = Object.assign({}, {}, {
      playerList: [...updatedPlayerList]
    })
    component.setState({gameSession: newGameState})
  });
}

