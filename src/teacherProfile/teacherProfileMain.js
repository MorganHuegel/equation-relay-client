import React from 'react';

import '../stylesheets/teacherProfile/teacherProfileMain.css';

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

        <DashboardMenu logout={this.logout}/>

        <div className='teacher-dashboard-games'>
          <div className='create-new'>
            <button type='button'>
              <i className='fas fa-plus-circle'></i>
              <p>Create New</p>
            </button>
          </div>
          <GameList games={this.props.userData.games}/>
        </div>

      </div>
    )
  }
}