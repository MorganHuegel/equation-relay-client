import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../stylesheets/landingPage/joinLanding/joinLanding.css';

import { sendJoinCode } from '../../fetchFunctions/players/sendJoinCode';

export class JoinLanding extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false,
      error: null
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const joinCode = document.getElementById('join-code').value;
    return sendJoinCode(joinCode)
      .then(sessionData => {
        this.setState({submitted: joinCode});
      })
      .catch(err => {
        this.setState({error: err.message})
      })
  }

  render(){
    if (this.state.submitted) {
      return <Redirect to={`/join/${this.state.submitted}`}/>
    }

    return (
      <div className='join-landing'>
        <form name='join-code-form' id='join-code-form' onSubmit={e => this.onSubmit(e)}>
          <label htmlFor='join-code'>Enter join code:</label>
          <input type='text' name='join-code' id='join-code'/>

          <button type='submit'>JOIN</button>
        </form>
        <p>
          {this.state.error}
        </p>
      </div>
    );
  }
}