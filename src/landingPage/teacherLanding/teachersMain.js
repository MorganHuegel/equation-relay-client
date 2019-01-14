import React from 'react';
import Spinner from 'react-spinkit';

import '../../stylesheets/landingPage/teacherMain.css';

import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';

import { validateRegisterSubmission, validateLoginSubmission } from './teachersMainUtils';
import { registerUserFetch } from '../../fetchFunctions';

export class TeachersMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      registering: true,
      errorMessage: '',
      fetchingData: false
    }
  }

  toggleLoginRegister = () => {
    this.setState({registering: !this.state.registering})
  }

  onSubmitLogin = (e) => {
    e.preventDefault();

    const validLogin = validateLoginSubmission(this);
    if (validLogin) {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      this.setState({fetchingData: true}, () => {
        console.log("Username: ", username, " Password: ", password);
      });
    }
  }

  onSubmitRegister = (e) => {
    e.preventDefault();

    const validRegistration = validateRegisterSubmission(this);
    if (validRegistration) {
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      this.setState({fetchingData: true}, () => {
        registerUserFetch(username, password, email);
      })
    }
  }

  render(){
    const errorDisplay = this.state.errorMessage ? (
      <div className='error-message'>
        <p>{this.state.errorMessage}</p>
      </div>
    ) : null;

    const form = this.state.registering ? 
      <RegisterForm onSubmitRegister={this.onSubmitRegister}  toggleLoginRegister={this.toggleLoginRegister}/> : 
      <LoginForm onSubmitLogin={this.onSubmitLogin} toggleLoginRegister={this.toggleLoginRegister}/>;

    const loadingSpinner = this.state.fetchingData ? (
      <div>
        <Spinner name='circle' color='blue' className='loading-spinner' fadeIn='half'/> 
        <p className='spinner-text'>Loading...</p>
      </div>
    ) : null;
      
    const header = this.state.registering ? 'Register' : 'Login';
    return (
      <div className='teacher-main'>
        <h2>{header}</h2>
        {errorDisplay}
        {form}
        {loadingSpinner}
      </div>
    );
  }
}