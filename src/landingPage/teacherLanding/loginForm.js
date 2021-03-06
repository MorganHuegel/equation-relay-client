import React from 'react';

export function LoginForm(props){
  return (
    <form id='login-form' name='login-form' onSubmit={(e) => props.onSubmitLogin(e)}>
      <label htmlFor='username'>Username or Email:</label>
      <input type='text' name='username' id='username' onChange={e => e.target.classList.remove('error-input')}/>

      <label htmlFor='password'>Password: </label>
      <input type='password' name='password' id='password' onChange={e => e.target.classList.remove('error-input')}/>

      <button type='submit' id='login-button'>Login</button>
      <button type='button' className='demo-account-button' onClick={() => props.seeDemoAccount()}>See demo account</button>
      <p className='toggle-login-register'>New user? 
        <button type='button' className='toggle-login-register-button' onClick={e => props.toggleLoginRegister()}>Sign up!</button>
      </p>
    </form>
  )
}