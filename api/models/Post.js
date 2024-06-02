const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: Array, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  bedroom: { type: Number, required: true },
  bathroom: { type: Number, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  type: { type: String, enum: ['buy', 'rent'], required: true },
  property: { type: String, enum: ['apartment', 'house', 'condo', 'land'], required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
  postDetail: { type: Schema.ObjectId, ref: 'PostDetail' },
  savedPosts: [{ type: Schema.ObjectId, ref: 'SavedPost' }]
});

const Post = mongoose.model('Post', PostSchema);



module.exports = Post;



  // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  // savedPosts: [{ type: Schema.Types.ObjectId, ref: 'SavedPost' }],
  // chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  // chatIDs: [{ type: Schema.Types.ObjectId }]