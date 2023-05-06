import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
  
  content: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tag: {
    type: String,
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
  },
  name: {
    type: String,
  },
  species: {
    type: String,
  },
  sex: {
    type: String,
  },
  color: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  weight: {
    type: Number,
  },
  sterilizer: {
    type: Boolean,
    default: false
  }

});


const Post = mongoose.model('Post', postSchema);


export default Post;
