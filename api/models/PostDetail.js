const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");


const PostDetailSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  desc: { type: String, required: true },
  utilities: { type: String },
  pet: { type: String },
  income: { type: String },
  size: { type: Number },
  school: { type: Number },
  bus: { type: Number },
  restaurant: { type: Number },
  post: { type: Schema.ObjectId, ref: 'Post', unique: true}
  
});

const PostDetail = mongoose.model('PostDetail', PostDetailSchema);

module.exports = PostDetail;



