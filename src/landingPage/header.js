import React from 'react';
import { NavLink } from 'react-router-dom';

import '../stylesheets/landingPage/header.css';

export function Header(){
  return (
    <header>
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