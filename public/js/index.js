import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';
import { logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const getInputsForm = form => {
  const dataArr = [...new FormData(form)];
  console.log(dataArr);
  const data = Object.fromEntries(dataArr);
  return data;
};

const removeInputsForm = form => {
  const inputs = form.querySelectorAll('input');
  inputs.forEach(el => (el.value = ''));
};

// DOM ELEMENTS
const mapBox = document.querySelector('#map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.querySelector('#book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // const data = getInputsForm(userDataForm);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const data = getInputsForm(userPasswordForm);
    await updateSettings(data, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    removeInputsForm(userPasswordForm);
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', async function(e) {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    await bookTour(tourId);
  });
}
