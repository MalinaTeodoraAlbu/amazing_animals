import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const defaultPictureUrl = new URL('../media/default.jpg', import.meta.url);
const defaultPicturePath = fileURLToPath(defaultPictureUrl);

const userSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    auto: true },
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
  birthday:{
    type: Date,
  },
  imagePaths: { type: String },
  userType: {
    type: String
  }
});
userSchema.index({ email: 1 }, { unique: true }); 
const User = mongoose.model('User', userSchema);

export default User;
