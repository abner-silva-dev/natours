import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await fetch(url, {
      method: 'PATCH',
      body: data
    });
    const dataAPI = await res.json();

    if (!res.ok) throw new Error(dataAPI.message);

    if (dataAPI.status === 'success') {
      showAlert('success', `${type.toUpperCase()} update successfully!`);
      setTimeout(() => location.assign('/me'), 1500);
    }
  } catch (err) {
    showAlert('error', err.message);
  }
};
