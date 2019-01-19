import React from 'react';

import { Redirect } from 'react-router-dom';
import { GameList } from './teacherDashboard/gameList';
import { DashboardMenu } from './teacherDashboard/dashboardMenu';

export class TeacherProfileMain extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editing: false,
      playing: false
    }
  }

  logout = () => {
    localStorage.clear();
    this.props.updateUserData(null);
  }

  render(){
    if (!this.props.userData) {
      return <Redirect to='/teachers'/>
    }

    const username = this.props.userData.username;
    return (
      <div className='teacher-profile-main'>
        <p>Teacher Profile Main {username}</p>
        <button type='button' onClick={() => this.logout()}>Logout</button>
        <DashboardMenu />
        <GameList games={this.props.userData.games}/>
      </div>
    )
  }
}