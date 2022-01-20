import axios from './lib/axios.min.js';
import App from './components/App.jsx';
const path = 'http://127.0.0.1:3000';

const signup = (username, password, callback) => {
  axios.post(`${path}/signup`, { username, password })
    .then((res) => {
      res.data.code === 11000 ? callback('Username already exists.') : callback();
    })
    .catch((err) => { console.log(err); callback('Something went wrong.') });
};

const login = (username, password, callback) => {
  axios.post(`${path}/login`, { username, password })
    .then(res => {
      if (res.data === 'invalid') {
        callback('Invalid login.');
      } else {
        document.cookie = `username=${username}`;
        document.cookie = `password=${password}`;
        callback();
      }
    })
    .catch(err => { console.log(err); callback('Something went wrong.') });
};

const create = (username, title, text, callback) => {
  axios.post(`${path}/notes`, { username, title, text })
    .then(res => { callback() })
    .catch(err => { console.log(err); callback('Something went wrong.') });
}

const read = (username) => {
  return axios.get(`${path}/notes?username=${username}`);
}

const destroy = (username, noteID) => {
  return axios.delete(`${path}/notes?username=${username}&noteID=${noteID}`);
}

const put = (username, noteID, text) => {
  return axios({
    method: 'put',
    url: `${path}/notes`,
    data: { username, noteID, text }
  });
}

export { signup, login, create, read, destroy, put };