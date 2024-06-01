const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");


const UserSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  username: {
    type: String,
    required: [true, "First Name Is Required!"],
    minLength: [3, "first name must containe At least 3 character"],
    unique: true,
    required: true
  },  
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please provide a Valid Email"],
    required: true
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
  },
  avatar: { type: String },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;



  // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  // savedPosts: [{ type: Schema.Types.ObjectId, ref: 'SavedPost' }],
  // chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  // chatIDs: [{ type: Schema.Types.ObjectId }]