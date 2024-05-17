const mongoose = require("mongoose"); // we can use ES6 so please replace this with import

// You need a way to reference the user and this is done by the MongoDB object Id
// it's unique and it can be used as a primary key to uniquely identify the user
// that's how you build relationships between entities.

const userSchema = new mongoose.Schema({
  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
