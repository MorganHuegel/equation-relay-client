import React from 'react';

export class JoinLanding extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const joinCode = document.getElementById('join-code').value;
    // Make query request to server to make sure this join code exists
      //if it does not exist, show error message
    // If it exists, redirect to the /sessionCode url component joinMain
    return ;
  }

  render(){
    return (
      <div>
        <form name='join-code-form' id='join-code-form' onSubmit={e => this.onSubmit(e)}>
          <label htmlFor='join-code'>Enter join code:</label>
          <input type='text' name='join-code' id='join-code'/>

          <button type='submit'>JOIN</button>
        </form>
      </div>
    );
  }
}