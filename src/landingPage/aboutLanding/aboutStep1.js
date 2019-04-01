import React from 'react';

import ScreenshotNew from '../../images/screenshots/screenshot-no-games.png';
import ScreenshotCreate from '../../images/screenshots/screenshot-creating-game.png';

export function AboutStep1(){
  return (
    <li className='about-step 1'>
      <h3>Step 1 - Teacher Creates Game</h3>
      <ul>
        <li className='substep one'>
          <p>After creating an account, click the "Create New" button on the dashboard.</p>
          <div className='screenshot-container'>
            <img src={ScreenshotNew} alt='screenshot of new user dashboard' className='screenshot'/>
          </div>
        </li>
        <li className='substep two'>
          <p>Questions can be anything that has a whole-number answer: Arithmetic facts, Evaluating Expressions, even Chemistry Equations!</p>
          <div className='screenshot-container'>
            <img src={ScreenshotCreate} alt='screenshot of new user dashboard' className='screenshot bottom'/>
          </div>
        </li>
      </ul>
    </li>
  );
}