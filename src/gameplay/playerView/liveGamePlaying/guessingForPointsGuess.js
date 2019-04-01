import React from 'react';
import Spinner from 'react-spinkit';

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
    const pointValue = Number(target.dataset.pointvalue);
    this.props.socket.emit('teamScored', {pointValue, teamId: this.props.teamData._id});
    this.setState({submitted: pointValue});
  }


  render(){
    if (this.state.submitted) {
      return (
        <div className='guessing-for-points-after'>
          <Spinner name="circle" color="rgb(234, 150, 146)"/>
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
      let value = i < correctGuessCount ?
        Math.floor(Math.random()*10) * 10 :
        -1 * Math.floor(Math.random()*10) * 10;

      if (value === 0) {
        value = 10;
      }
      treasureValues.push(value);
    }

    let treasureImages = treasureValues.map( (pointValue, index) => {
      const contClass = (this.props.teamData.players.length === 3 && index === 2) ? 'treasure-box-container three' : 'treasure-box-container';
      const imgClass = (this.props.teamData.players.length === 3 && index === 2) ? 'treasure-box three' : 'treasure-box';
      console.log('IMGCLASS', imgClass, '  CONTCLASS', contClass, '   INDEX: ', index);
      return (
        <div className={contClass} key={index} >
        <input 
          type='image' 
          id={`box${index}`} 
          //key={index} 
          alt={`treasure box number ${index + 1}`}
          src={treasureBox} 
          data-pointvalue={pointValue}
          onClick={e => this.handleClick(e.target)}
          className={imgClass}
          />
        </div>
      )
    })
    
    return (
      <div className='guessing-for-points-guess'>
        <h2>Choose wisely...</h2>
        {treasureImages}
      </div>
    )
  }
}