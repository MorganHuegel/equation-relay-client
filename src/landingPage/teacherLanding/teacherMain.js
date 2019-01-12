import React from 'react';

import '../../stylesheets/landingPage/teacherMain.css';

import { LoginForm } from './loginForm';
import { RegisterForm } from './registerForm';

export class TeacherMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      registering: true
    }
  }

  toggleLoginRegister = () => {
    this.setState({registering: !this.state.registering})
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    console.log('Logged In!');
  }

  onSubmitRegister = (e) => {
    e.preventDefault();
    console.log('Registered!');
  }

  render(){
    const form = this.state.registering ? 
      <RegisterForm onSubmitRegister={this.onSubmitRegister}  toggleLoginRegister={this.toggleLoginRegister}/> : 
      <LoginForm onSubmitLogin={this.onSubmitLogin} toggleLoginRegister={this.toggleLoginRegister}/>;
      
    const header = this.state.registering ? 'Register' : 'Login';
    return (
      <div className='teacher-main'>
        <h2>{header}</h2>
        {form}
        <p>Graphics go here...</p>
      </div>
    );
  }
}