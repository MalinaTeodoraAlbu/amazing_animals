const mongoose = require('mongoose');


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
  likes: {
    type: Array,
    default: [],
  },
  imagePaths: { type: String },
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

}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);


module.exports =  Post;
