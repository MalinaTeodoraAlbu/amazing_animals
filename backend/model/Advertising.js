const mongoose = require('mongoose');


const advertisingSchema = new mongoose.Schema({
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
  datePosted: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagePaths: { type: String },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },

}, { timestamps: true });


const Advertising = mongoose.model('Advertising', advertisingSchema);


module.exports =  Advertising;
