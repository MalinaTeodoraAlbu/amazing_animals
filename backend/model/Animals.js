const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagePaths: {
    type: String
  },
  sterilizer: {
    type: Boolean,
    default: false
  }
});

const Animal = mongoose.model('Animal', animalSchema);


module.exports = Animal;
