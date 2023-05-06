import mongoose from 'mongoose';

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
  picture: {
    type: String,
    required: true
  },
  sterilizer: {
    type: Boolean,
    default: false
  }
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
