import React from 'react';

import '../../stylesheets/teacherProfile/teacherDashboard/dashboardUserMessage.css';

export class DashboardUserMessage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.message === this.props.message) {
      return;
    }

    // no message to message - change text, then add class
    if (!prevProps.userMessage && this.props.userMessage) {
      console.log('first if')
      this.setState({message: this.props.userMessage}, () => {
        document.getElementById('dashboard-user-message').classList.add('expanded');
      })
    }
    // message to no message - remove class, wait 1s, then change text
    else if (prevProps.userMessage && !this.props.userMessage) {
      console.log('second if')
      document.getElementById('dashboard-user-message').classList.remove('expanded')
      setTimeout(() => {
        if (!document.getElementById('dashboard-user-message').classList.contains('expanded')) {
          this.setState({message: ''})
        }
      }, 1000);
    }
    // message to different message - no change in style
    else if (prevProps.userMessage !== this.props.userMessage) {
      console.log('third if')
      this.setState({message: this.props.userMessage});
    }
  }

  render(props){
    return (
      <div className='dashboard-user-message' id='dashboard-user-message'>
        <div className='message-container'>
          <button onClick={() => this.props.closeUserMessage()}><i className="far fa-times-circle"></i></button>
          <p>{this.state.message}</p>
        </div>

      </div>
    )
  }

}