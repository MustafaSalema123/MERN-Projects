const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedPostSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true, unique: true },
  post: { type: Schema.ObjectId, ref: 'Post', required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

SavedPostSchema.index({ user: 1, post: 1 }, { unique: true });


const SavedPost = mongoose.model('SavedPost', PostSchema);

module.exports = SavedPost;