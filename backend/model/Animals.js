import mongoose from 'mongoose';

const animalSchema = new mongoose.Schema({
  id: {
    type: Number
  },
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
  }
});

const Animal = mongoose.model('Animal', animalSchema);

export default Animal;
