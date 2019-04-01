import React from 'react';

import ScreenshotPlayer from '../../images/screenshots/screenshot-player.png';
import ScreenshotPlayerGuessing from '../../images/screenshots/screenshot-player-guessing.png';
import ScreenshotTeacherScoreboard from '../../images/screenshots/screenshot-teacher-scoreboard.png';

export function AboutStep3(){
  return (
    <li className='about-step 3'>
      <h3>Step 3 - Watch Learning Happen!</h3>
      <ul>
        <li className='substep one'>
          <p>Students collaborate to arrive at a group answer.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotPlayer} alt='screenshot of Play Live button' className='screenshot'/>
          </div>
          <p>Students earn more points for correct answers.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotPlayerGuessing} alt='screenshot of Play Live button' className='screenshot'/>
          </div>
        </li>
        <li className='substep two'>
          <p>Teacher acts as a guide on the side, watching progress and providing social cues.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotTeacherScoreboard} alt='screenshot of Play Live button' className='screenshot bottom'/>
          </div>
        </li>
      </ul>
    </li>
  );
}