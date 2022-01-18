import axios from './lib/axios.min.js';
import App from './components/App.jsx';

const signup = (username, password, callback) => {
  axios.post('/signup', { username, password })
  .then((res) => {
    res.data.code === 11000 ? callback('Username already exists.') : callback();
  })
  .catch((err) => { callback('Something went wrong.') });
};

const login = (username, password, callback) => {
  axios.post('/login', { username, password })
  .then((res) => {
    res.data === 'invalid' ? callback('Invalid login.') : callback();
  })
  .catch((err) => {
    callback('Something went wrong.');
  });
};

export { signup, login };