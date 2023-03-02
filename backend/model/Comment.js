import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    userid: {
      type: Number
    },
    id:{
      type: Number
    }
  });

  const Comment = mongoose.model('Comment', commentSchema);

  
export default Comment;