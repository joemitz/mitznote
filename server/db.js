const User = require('./schema.js').User;

module.exports = {
  user: {
    login: (username, password) => {
      return User.find({ username, password });
    },
    signup: (username, password) => {
      const newUser = new User({ username, password });
      return newUser.save();
    }
  }
}