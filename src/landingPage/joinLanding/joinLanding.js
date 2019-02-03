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