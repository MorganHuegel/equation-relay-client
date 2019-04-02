import React from 'react';

import '../../stylesheets/gameplay/playerView/playerJoinedAndWaiting.css';

export class PlayerJoinedAndWaiting extends React.Component {
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