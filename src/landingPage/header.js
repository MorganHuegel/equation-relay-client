import React from 'react';
import { NavLink } from 'react-router-dom';

import '../stylesheets/landingPage/header.css';

export function Header(){
  return (
    <header className='landing-page-header'>
      <h1><span>Equation</span><span> Relay</span></h1>
      <ul>
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
    </header>
  )
}