import '@babel/polyfill';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    console.log(res);
    const data = await res.json();
    console.log(data);

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
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/logout');
    const data = await res.json();

    if (data.status === 'success') location.assign('/');
  } catch (err) {
    showAlert('error', 'Error logging out! Try again');
  }
};
