import React from 'react';

import treasureBox from '../../../images/treasure-box.jpg';

import '../../../stylesheets/gameplay/playerView/liveGamePlaying/guessingForPointsGuess.css';

export class GuessingForPointsGuess extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      submitted: false
    }
  }


  handleClick = (target) => {
    console.log('THIS: ',this);
    console.log('THIS.PROPS: ',this.props);
    const pointValue = Number(target.dataset.pointvalue);
    this.props.socket.emit('teamScored', {pointValue, teamId: this.props.teamData._id});
    this.setState({submitted: pointValue});
  }


  render(){
    if (this.state.submitted) {
      return (
        <div>
          <h3>{this.state.submitted} points!</h3>
          <button>Continue</button>
        </div>
      )
    }

    let correctGuessCount = 0;
    this.props.teamData.players.forEach(player => {
      if (player.correctGuess) {
        correctGuessCount++;
      }
    });

    let treasureValues = [];
    for (let i = 0; i < this.props.teamData.players.length; i++) {
      if (i < correctGuessCount) {
        treasureValues.push(Math.floor(Math.random()*10) * 10);
      } else {
        treasureValues.push(-1 * Math.floor(Math.random()*10) * 10);
      }
    }


    let treasureImages = treasureValues.map( (pointValue, index) => {
      return <input 
        type='image' 
        id={`box${index}`} 
        key={index} 
        alt={`treasure box number ${index + 1}`} 
        src={treasureBox} 
        data-pointvalue={pointValue}
        onClick={e => this.handleClick(e.target)}
        className='treasure-box'
        />
    })
    
    return (
      <div>
        {treasureImages}
      </div>
    )
  }
}