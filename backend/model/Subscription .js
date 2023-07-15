const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionType: {
    type: String
  },
  startDate: {
    type: Date
  },
  price: {
    type: Number
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String
  },
  nextBillingDate: {
    type: Date
  },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
