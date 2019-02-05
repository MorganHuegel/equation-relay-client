import React from 'react';

import { teacherGameplayMainWillMount } from './teacherSocketUtils';

export class TeacherGameplayMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameSession: null,
      socketInstance: null
    }
  }

  componentWillMount(){
    teacherGameplayMainWillMount(this);
  }

  componentWillUnmount(){
    this.state.socketInstance.disconnect();
  }

  render(){
    return (
      <div className='teacher-gameplay-main'>
        <h2>Join Code: {this.props.sessionCode}</h2>
        <button type='button' onClick={() => this.props.closeLiveGame()}>Quit</button>
      </div>
    );
  }
}