import React from 'react';
import Spinner from 'react-spinkit';

import '../../stylesheets/landingPage/teacherMain.css';

import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';

import { validateRegisterSubmission, validateLoginSubmission } from './teachersMainUtils';
import { registerUserFetch } from '../../fetchFunctions/registerUserFetch';
import { loginUserFetch } from '../../fetchFunctions/loginUserFetch';
import { fetchUserData } from '../../fetchFunctions/fetchUserData';

export class TeachersMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      registering: false,
      errorMessage: '',
      fetchingData: false
    }
  }

  componentWillMount(){
    const token = localStorage.getItem('authToken');
    if (token) {
      this.props.setFetchingDataState(true);
      return fetchUserData(token)
        .then(userData => {
          this.props.updateUserData(userData);
          this.props.setFetchingDataState(false);
        })
        .catch(errorMessage => {
          this.props.setFetchingDataState(false);
          this.setState({errorMessage})
        })
    }
  }

  componentWillUpdate(){
    const token = localStorage.getItem('authToken');
    if (token) {
      return fetchUserData(token)
        .then(userData => this.props.updateUserData(userData))
        .catch(errorMessage => this.setState({errorMessage}));
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
        return loginUserFetch(username, password)
          .then(() => this.setState({fetchingData: false}))
          .catch(errorMessage => this.setState({errorMessage, fetchingData: false}))
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
        return registerUserFetch(username, password, email)
          .then( () => this.setState({fetchingData: false}))
          .catch(errorMessage => this.setState({errorMessage, fetchingData: false}))
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