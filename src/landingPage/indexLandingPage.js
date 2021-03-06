import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Spinner from 'react-spinkit';

import '../stylesheets/landingPage/indexLandingPage.css';

import { Header } from './header';
import { AboutMain } from './aboutLanding/aboutMain';
import { TeachersMain } from './teacherLanding/teachersMain';
import { JoinLanding } from './joinLanding/joinLanding';
import { JoinMain } from '../gameplay/playerView/joinMain';
import { TeacherProfileMain } from '../teacherProfile/teacherProfileMain';

export class IndexLandingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: null,
      fetchingData: false
    }
  }

  updateUserData = userData => {
    this.setState({userData, fetchingData: false})
  }

  setFetchingDataState = (bool) => {
    this.setState({fetchingData: bool});
  }

  render(){
    const teacherToken = localStorage.getItem('authToken');
    return (
      <Router>
        <div className='index-landing-page'>
          <Header />
          <Route exact path='/' render={props => teacherToken ? <Redirect to='/teachers'/> : <Redirect to='/join'/>}/>
          <Route exact path='/join' component={JoinLanding}/>
          <Route path='/join/:sessionCode' component={JoinMain}/>
          <Route exact path='/teachers' render={props => {
            if (this.state.fetchingData) {
              return <Spinner name='ball-clip-rotate' color='rgb(220, 220, 220)' className='loading-spinner' fadeIn='none' style={{marginTop: '80px'}}/>
            }
            else if (!this.state.userData) {
              return <TeachersMain updateUserData={this.updateUserData} setFetchingDataState={this.setFetchingDataState}/>
            }
            else {
              return <Redirect to={`/teachers/${this.state.userData.id}`}/>
            }
          }}/>
          <Route path='/teachers/:id' render={props => (
            <TeacherProfileMain 
              userData={this.state.userData} 
              updateUserData={this.updateUserData}
            /> )
          } />
          <Route path='/about' component={AboutMain}/>
        </div>
      </Router>
    )
  }
};