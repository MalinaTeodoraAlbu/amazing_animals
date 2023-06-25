const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
  idPOST: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  idUSER: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: String,
  },
  isview: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Notifications = mongoose.model('Notifications', NotificationsSchema);

module.exports = Notifications;
