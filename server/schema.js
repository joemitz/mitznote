const mongoose = require('mongoose');
const { Schema } = mongoose;

const connect = async () => {
  await mongoose.connect('mongodb://localhost:27017/mitznote');
}

connect().catch(err => console.log(err));

const mitznoteSchema = new Schema({
  username: String,
  password: String,
  notes: [
    {
      title: String,
      text: String
    }
  ]
});

const User = mongoose.model('user', mitznoteSchema);

module.exports.User = User;