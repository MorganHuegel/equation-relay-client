import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/dashboardMenu.css';

import { DashboardMenuItem } from './dashboardMenuItem';

let propsScope;

export function DashboardMenu (props) {
  propsScope = props;
  const menuButtons = dashboardButtons.map(button => {
    const selected = button.buttonText === 'Created Games' ? 'selected' : '';
    return <DashboardMenuItem buttonText={button.buttonText} onClick={props.clickInactiveDashboardButton} key={button.buttonText} selected={selected}/>
  })
  return (
    <ul className='dashboard-buttons'>
      <li className='profile-pic'>
      </li>
      {menuButtons}
    </ul>
  )
}


const dashboardButtons = [
  {
    buttonText: 'Created Games', 
    clickFunction: () => console.log('Created Game')
  },
  {
    buttonText: 'Profile Info', 
    clickFunction: () => console.log('Profile Info')
  },
  {
    buttonText: 'Favorites', 
    clickFunction: () => console.log('Favorites')
  },
  {
    buttonText: 'Game Stats', 
    clickFunction: () => console.log('Game Stats')
  },
  {
    buttonText: 'Browse Public Games', 
    clickFunction: () => console.log('Browse Public Games')
  },
  {
    buttonText: 'Logout', 
    clickFunction: () => propsScope.logout()
  }
]