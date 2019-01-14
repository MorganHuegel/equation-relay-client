export function validateLoginSubmission (component) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (!username) {
    component.setState({errorMessage: "Username or email is required."}, () => {
      const usernameInput = document.getElementById('username');
      usernameInput.focus();
      usernameInput.classList.add('error-input');
    })
    return false;
  }

  else if (password.length < 8) {
    component.setState({errorMessage: "Password must be at least 8 characters long."}, () => {
      const passwordInput = document.getElementById('password');
      passwordInput.focus();
      passwordInput.classList.add('error-input');
    });
    return false;
  }

  return true;
}

export function validateRegisterSubmission (component) {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!username) {
    component.setState({errorMessage: "Username is required."}, () => {
      const usernameInput = document.getElementById('username');
      usernameInput.focus();
      usernameInput.classList.add('error-input');
    });
    return false;
  }

  else if (!email) {
    component.setState({errorMessage: "Email is required."}, () => {
      const emailInput = document.getElementById('email');
      emailInput.focus();
      emailInput.classList.add('error-input');
    });
    return false;
  }

  else if (password.length < 8) {
    component.setState({errorMessage: "Password must be at least 8 characters long."}, () => {
      const passwordInput = document.getElementById('password');
      passwordInput.focus();
      passwordInput.classList.add('error-input');
    });
    return false;
  }

  else if (password !== confirmPassword) {
    component.setState({errorMessage: "Passwords did not match."}, () => {
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirm-password');
      passwordInput.value = '';
      passwordInput.focus();
      passwordInput.classList.add('error-input');

      confirmPasswordInput.value = '';
      confirmPasswordInput.classList.add('error-input');
    });
    return false;
  }

  return true;
}