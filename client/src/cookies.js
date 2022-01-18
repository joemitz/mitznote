import * as request from './requests.js';

const check = (callback) => {
  if (document.cookie) {
    let username;
    cookieStore.get('username')
      .then(cookieUsername => {
        username = cookieUsername;
        return cookieStore.get('password')
      })
      .then(password => {
        request.login(username, password, err => {
          if (!err) { callback() };
        });
      }).catch(err => console.log(err));
  }
}

const clear = (callback) => {
  cookieStore.delete('username')
      .then(() => cookieStore.delete('password'))
      .then(() => callback())
      .catch(err => console.log(err));
}

export { check, clear };