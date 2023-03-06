import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    id:{
      type: Number
    }
  });

  const Comment = mongoose.model('Comment', commentSchema);

  
export default Comment;