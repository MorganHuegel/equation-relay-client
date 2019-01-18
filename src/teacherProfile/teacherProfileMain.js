import React from 'react';

import { Redirect } from 'react-router-dom';

export class TeacherProfileMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: false,
      playing: false
    }
  }

  render(){
    if (!this.props.userData) {
      return <Redirect to='/teachers'/>
    }
    const username = this.props.userData.username;
    return <p>Teacher Profile Main {username}</p>
  }
}