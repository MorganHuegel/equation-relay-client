import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Header } from './header';
import { AboutMain } from './aboutLanding/aboutMain';
import { TeachersMain } from './teacherLanding/teachersMain';
import { JoinMain } from './joinLanding/joinMain';

export function IndexLandingPage(){
  const teacherToken = localStorage.getItem('teacherToken');

  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' render={props => teacherToken ? <Redirect to='/teachers'/> : <Redirect to='/join'/>}/>
        <Route path='/join' component={JoinMain}/>
        <Route path='/teachers' component={TeachersMain}/>
        <Route path='/about' component={AboutMain}/>
      </div>
    </Router>
    
  )
};