const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const chatSchema = new Schema({
//   users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   userIDs: [{ type: Schema.Types.ObjectId }],
//   createdAt: { type: Date, default: Date.now },
//   seenBy: [{ type: Schema.Types.ObjectId }],
//   messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
//   lastMessage: { type: String }
// });

const chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  userIDs: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference User schema here
  createdAt: { type: Date, default: Date.now },
  seenBy: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Reference User schema here
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  lastMessage: { type: String }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;