import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/dashboardMenuItem.css';

export function DashboardMenuItem (props) {
  return (
    <li className='dashboard-button'>
      <button type='button' onClick={() => props.onClick()}>
        {props.buttonText}
      </button>
    </li>
  )
}