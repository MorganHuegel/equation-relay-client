import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../stylesheets/landingPage/joinLanding/joinLanding.css';

import { sendJoinCode } from '../../fetchFunctions/players/sendJoinCode';

import { Sparkle } from './sparkle';

export class JoinLanding extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      submitted: false,
      error: null,
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

    const numOfSparkles = window.innerWidth < 450 ? 20 : 60;

    return (
      <div className='join-landing'>

        <div id='sparkles-container'>
          <Sparkle
            color={'random'} 
            count={numOfSparkles} 
            minSize={10}
            maxSize={15}
            overflowPx={0}
            fadeOutSpeed={10}
            //newSparkleOnFadeOut={true}
            flicker={true}
            flickerSpeed={'normal'}
            />
        </div>

        <form name='join-code-form' id='join-code-form' onSubmit={e => this.onSubmit(e)}>
          <label htmlFor='join-code'>Enter join code:</label>
          <input type='text' name='join-code' id='join-code'/>

          <button type='submit'>Join</button>
        </form>
        <p className='error-message'>
          {this.state.error}
        </p>
      </div>
    );
  }
}