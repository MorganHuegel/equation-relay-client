import React from 'react';

export function RegisterForm(props){
  return (
    <form id='login-form' name='login-form' onSubmit={(e) => props.onSubmitRegister(e)}>
      <label htmlFor='username'>Username:</label>
      <input type='text' name='username' id='username'/>

      <label htmlFor='email'>Email:</label>
      <input type='email' name='email' id='email'/>

      <label htmlFor='password'>Password: </label>
      <input type='password' name='password' id='password'/>

      <label htmlFor='confirm-password'>Confirm password: </label>
      <input type='password' name='confirm-password' id='confirm-password'/>

      <button type='submit'>Register</button>
      <button type='button'>See demo account</button>
      <p className='toggle-login-register'>Already a user? 
        <button type='button' onClick={e => props.toggleLoginRegister()}>Login</button>
      </p>
    </form>
  )
}