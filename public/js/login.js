import { showAlert } from './alerts';

export const signup = async ({ name, email, password, passwordConfirm }) => {
  try {
    const res = await fetch('/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', `Welcome! ${name}`);
      setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};

export const login = async (email, password) => {
  try {
    const res = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};
export const forgotPassword = async email => {
  try {
    const res = await fetch('/api/v1/users/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', 'token was sent to your email!', 10);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};

export const recoverAccount = async (password, passwordConfirm, token) => {
  try {
    const res = await fetch(`/api/v1/users/resetPassword/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        passwordConfirm
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    if (data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      setTimeout(() => location.assign('/'), 1500);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};

export const logout = async () => {
  try {
    const res = await fetch('/api/v1/users/logout');
    const data = await res.json();

    if (data.status === 'success') location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again');
  }
};
