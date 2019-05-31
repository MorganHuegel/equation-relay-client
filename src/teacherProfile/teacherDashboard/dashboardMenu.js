import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/dashboardMenu.css';

import { DashboardMenuItem } from './dashboardMenuItem';

let propsScope;

export function DashboardMenu (props) {
  propsScope = props;
  const menuButtons = dashboardButtons.map(button => {
    const selected = button.buttonText === 'Created Games' ? 'selected' : '';
    return <DashboardMenuItem buttonText={button.buttonText} onClick={button.clickFunction ? button.clickFunction : props.clickInactiveDashboardButton} key={button.buttonText} selected={selected}/>
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
    clickFunction: null
  },
  {
    buttonText: 'Profile Info', 
    clickFunction: null
  },
  {
    buttonText: 'Favorites', 
    clickFunction: null
  },
  {
    buttonText: 'Game Stats', 
    clickFunction: null
  },
  {
    buttonText: 'Browse Public Games', 
    clickFunction: null
  },
  {
    buttonText: 'Logout', 
    clickFunction: () => propsScope.logout()
  }
]