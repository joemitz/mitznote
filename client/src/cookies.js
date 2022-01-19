import * as request from './requests.js';

const check = (callback) => {
  if (document.cookie) {
    let username, password
    cookieStore.get('username')
      .then(cookie => {
        username = cookie.value;
        return cookieStore.get('password')
      })
      .then(cookie => {
        password = cookie.value;
        request.login(username, password, err => {
          if (!err) { callback(username) };
        });
      })
      .catch(err => console.log(err));
  }
}

const clear = (callback) => {
  cookieStore.delete('username')
    .then(() => cookieStore.delete('password'))
    .then(() => callback())
    .catch(err => console.log(err));
}

export { check, clear };