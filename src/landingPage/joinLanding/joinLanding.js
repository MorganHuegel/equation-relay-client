import React from 'react';

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

      })
      .catch(err => {
        console.log('ErR',err)
        this.setState({error: err.message})
      })
    // Make query request to server to make sure this join code exists
      //if it does not exist, show error message
    // If it exists, redirect to the /sessionCode url component joinMain
  }

  render(){
    return (
      <div>
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