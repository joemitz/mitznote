const User = require('./schema.js').User;

module.exports = {
  user: {
    signup: (username, password) => {
      const newUser = new User({ username, password });
      return newUser.save();
    },
    login: (username, password) => {
      return User.findOne({ username, password });
    }
  }
}