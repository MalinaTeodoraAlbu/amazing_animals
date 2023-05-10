const mongoose = require('mongoose');

const postCommentSchema = new mongoose.Schema({
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: true
    }
  });

  const PostComment = mongoose.model('PostComment', postCommentSchema);
  module.exports =  PostComment;