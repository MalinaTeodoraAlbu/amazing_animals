const mongoose = require('mongoose');
const path = require('path');
const { fileURLToPath } = require('url');

const defaultPictureUrl = new URL('../media/default.jpg', 'file://' + path.resolve(__dirname, '..'));
const defaultPicturePath = fileURLToPath(defaultPictureUrl);

const userSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    auto: true 
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date,
  },
  userType: {
    type: String,
    default: "Standard"
  },
  imagePaths: {
    type: String,
    default: '../uploads/default.png'
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  socketId: {
    type: String
  }
}, { timestamps: true });


userSchema.index({ email: 1 }, { unique: true }); 
const User = mongoose.model('User', userSchema);

module.exports = User;