import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});


const Post = mongoose.model('Post', postSchema);


export default Post;
