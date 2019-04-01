import React from 'react';

import '../../stylesheets/landingPage/aboutLanding/aboutMain.css';

import { AboutStep1 } from './aboutStep1';
import { AboutStep2 } from './aboutStep2';
import { AboutStep3 } from './aboutStep3';

export function AboutMain(){
  return (
    <div className='about-main'>
      <h2>How to Play</h2>
      <ol>
        <AboutStep1 />
        <AboutStep2 />
        <AboutStep3 />        
      </ol>
    </div>
  );
}