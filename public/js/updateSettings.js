import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    let url;
    let optionsFetch = {
      method: 'PATCH',
      body: data
    };

    if (type === 'password') {
      url = '/api/v1/users/updateMyPassword';
      optionsFetch.headers = {
        'Content-Type': 'application/json'
      };
    } else {
      url = '/api/v1/users/updateMe';
    }

    const res = await fetch(url, optionsFetch);
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
