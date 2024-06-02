const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;