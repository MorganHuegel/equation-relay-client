import { SERVER_BASE_URL } from '../../config';
import io from 'socket.io-client';


export function teacherGameplayMainWillMount (component) {
  const socket = io(SERVER_BASE_URL, {
    forceNew: true,
    query: {
      sessionCode: component.props.sessionCode
    }
  });

  component.setState({socketInstance: socket}, () => {
    socket.on('playerJoin', (data) => {
      console.log('PLAYER JOINED (in teacherSocketUtils)', data)
    })
  })
}
