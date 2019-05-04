import React from 'react';

import '../../stylesheets/gameplay/playerView/playerJoinedAndWaiting.css';

import { hideHeader } from '../../landingPage/header';

export class PlayerJoinedAndWaiting extends React.Component {
  componentWillMount(){
    hideHeader();
  }

  componentWillUnmount () {
    //Get rid of sparkles
    document.getElementById('sparkles-container').style.display = 'none';
  }

  render(props){
    return (
      <div className='player-joined-and-waiting'>
        <h2>Welcome, <span>{this.props.handle}</span>!</h2>
        <p>Tell your classmates to hurry up!</p>
      </div>
    )
  }
}