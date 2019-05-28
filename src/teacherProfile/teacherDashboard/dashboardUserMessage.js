import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/dashboardUserMessage.css';

export function DashboardUserMessage (props) {
  if (!props.userMessage) {
    return null;
  }

  return (
    <div className='dashboard-user-message'>
      <button onClick={() => props.closeUserMessage()}><i class="far fa-times-circle"></i></button>
      <p>{props.userMessage}</p>
    </div>
  )
}