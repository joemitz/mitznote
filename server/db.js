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
  },
  notes: {
    create: async (username, title, text) => {
      const user = await User.findOne({ username });
      user.notes.push({ title, text });
      return user.save();
    },
    get: async (username) => {
      let user = await User.findOne({ username });
      return user.notes.map(note => {
        return {
          title: note.title,
          text: note.text
        }
      });
    }
  }
}