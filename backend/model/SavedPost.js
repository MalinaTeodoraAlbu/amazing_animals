import mongoose from 'mongoose';

const savedPostSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

  
  });
  
  
  const SavedPost = mongoose.model('SavedPost', savedPostSchema);
  
  
  export default SavedPost;