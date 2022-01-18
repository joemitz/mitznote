const User = require('./schema.js').User;

module.exports = {
  user: {
    login: (username, password) => {
      return new Promise((res, rej) => {
        User.findOne({ username, password }, (err, result) => {
          err ? rej(err) : res(result);
        });
      });
    },
    signup: (username, password) => {
      const newUser = new User({ username, password });
      return newUser.save();
    }
  }
}