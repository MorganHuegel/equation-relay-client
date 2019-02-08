import React from 'react';

import { EnterUsername } from './playerView/enterUsername';

export class JoinMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSession: null
    }
  }

  render(){
    return (
      <EnterUsername sessionCode={this.props.match.params.sessionCode}/>
    );
  }
}