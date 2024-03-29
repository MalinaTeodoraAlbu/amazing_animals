const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({

  name: {
    type: String
  },
  species: {
    type: String
  },
  sex: {
    type: String
  },
  color: {
    type: String
  },
  birthday: {
    type: Date
  },
  weight: {
    type: String
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  imagePaths: {
    type: String
  },
  sterilizer: {
    type: String
  }
});

const Animal = mongoose.model('Animal', animalSchema);


module.exports = Animal;
