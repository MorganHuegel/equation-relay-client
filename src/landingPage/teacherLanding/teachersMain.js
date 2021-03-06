import React from 'react';
import Spinner from 'react-spinkit';

import '../../stylesheets/landingPage/teacherMain.css';

import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';

import { validateRegisterSubmission, validateLoginSubmission } from './teachersMainUtils';
import { registerUserFetch } from '../../fetchFunctions/teachers/registerUserFetch';
import { loginUserFetch } from '../../fetchFunctions/teachers/loginUserFetch';
import { fetchUserData } from '../../fetchFunctions/teachers/fetchUserData';

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
        })
        .catch(errorMessage => {
          localStorage.removeItem('authToken');
          this.props.setFetchingDataState(false);
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
    this.setState({
      errorMessage: "",
      registering: !this.state.registering
    })
  }

  onSubmitLogin = (e) => {
    e.preventDefault();

    const validLogin = validateLoginSubmission(this);
    if (validLogin) {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      this.setState({fetchingData: true}, () => {
        return loginUserFetch(username, password)
          .then(() => this.setState({errorMessage: ""}))
          .catch(errorMessage => {
            this.setState({errorMessage, fetchingData: false})
          })
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
      this.setState({
        errorMessage: "",
        fetchingData: true
      }, () => {
        return registerUserFetch(username, password, email)
          .then( () => this.setState({fetchingData: false}))
          .catch(errorMessage => {
            this.setState({errorMessage, fetchingData: false})
          })
      })
    }
  }


  seeDemoAccount = () => {
    if (this.state.registering) {
      this.setState({
        errorMessage: "",
        fetchingData: false,
        registering: false
      }, this.seeDemoAccount);
    } else {
      document.getElementById('username').value = 'bobuser';
      document.getElementById('password').value = 'baseball';
      document.getElementById('login-button').click();
    }

  }


  render(){
    const errorDisplay = this.state.errorMessage ? (
      <div className='error-message'>
        <p>{this.state.errorMessage}</p>
      </div>
    ) : null;

    const form = this.state.registering ? 
      <RegisterForm onSubmitRegister={this.onSubmitRegister}  toggleLoginRegister={this.toggleLoginRegister} seeDemoAccount={this.seeDemoAccount}/> : 
      <LoginForm onSubmitLogin={this.onSubmitLogin} toggleLoginRegister={this.toggleLoginRegister} seeDemoAccount={this.seeDemoAccount}/>;

    const loadingSpinner = this.state.fetchingData ? (
      <div>
        <Spinner name='circle' color='rgb(220, 220, 220)' className='loading-spinner' fadeIn='half'/> 
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