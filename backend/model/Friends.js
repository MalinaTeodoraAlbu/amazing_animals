const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userIDFriend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

  
  });
  
  
  const Friends = mongoose.model('Friends', friendSchema);
  
  

  module.exports = Friends;