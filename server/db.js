const mongoose = require('mongoose');
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
          id: note._id.toString(),
          title: note.title,
          text: note.text
        }
      });
    },
    destroy: async (username, noteID) => {
      let user = await User.findOne({ username });
      user.notes.pull({ _id: noteID });
      return user.save();
    },
    update: async (username, noteID, text) => {
      let user = await User.findOne({ username });
      let noteIDs = user.notes.map(note => {
        return note.id;
      });
      let noteIndex = noteIDs.indexOf(noteID);
      user.notes[noteIndex].text = text;
      return user.save();
    }
  }
}