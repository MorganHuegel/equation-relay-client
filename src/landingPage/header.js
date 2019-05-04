import React from 'react';
import { NavLink } from 'react-router-dom';

import '../stylesheets/landingPage/header.css';

import { Sparkle } from './joinLanding/sparkle';

export function Header(){
  const numOfSparkles = window.innerWidth < 450 ? 20 : 60;
  let currentPath = window.location.href;
  let sparkleDiv = currentPath.match(/(join)/g) ? (
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
  ) : null;


  return (
    <header className='landing-page-header'>
      <h1><span>Equation</span><span>Relay</span></h1>

      <ul className='nav-list'>
        <li>
          <NavLink to="/join" activeClassName='selected-route'>Join</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName='selected-route'>About</NavLink>
        </li>
        <li>
          <NavLink to="/teachers" activeClassName='selected-route'>Teachers</NavLink>
        </li>
      </ul>

      {sparkleDiv}

    </header>
  )
}

export function hideHeader () {
    //disable header links
    let navList = document.getElementsByClassName('nav-list')[0];
    [...navList.children].forEach(li => {
      let link = li.firstElementChild;
      li.classList.add('slideup');
      setTimeout(() => link.style.display = 'none', 1500)
    })
    navList.classList.add('slideup');
}

export function revealHeader () {
  //RE-INSTATE NAV BAR
  let navList = document.getElementsByClassName('nav-list')[0];
  [...navList.children].forEach(li => {
    let link = li.firstElementChild;
    li.classList.remove('slideup');
    setTimeout(() => link.style.display = 'inherit', 500)
  })
  navList.classList.remove('slideup');
}