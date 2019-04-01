import React from 'react';

import ScreenshotPlayButton from '../../images/screenshots/screenshot-play-live-button.png';
import ScreenshotJoinCode from '../../images/screenshots/screenshot-joining.png';

export function AboutStep2(){
  return (
    <li className='about-step 2'>
      <h3>Step 2 - Start Live Game</h3>
      <ul>
        <li className='substep one'>
          <p>Teacher clicks start and displays the Join Code.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotPlayButton} alt='screenshot of Play Live button' className='screenshot'/>
          </div>
        </li>
        <li className='substep two'>
          <p>Students enter Join code to enter the game.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotJoinCode} alt='screenshot of Play Live button' className='screenshot bottom'/>
          </div>
        </li>
      </ul>
    </li>
  );
}