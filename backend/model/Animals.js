const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
  }
});

const medicalRecordSchema = new mongoose.Schema({
    id: {
      type: Number
    },
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Animal',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    repeat: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  });

const animalMedicalRecordSchema = new mongoose.Schema({
  animalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medical_Record',
    required: true
  }
});

animalSchema.plugin(AutoIncrement, { inc_field: 'id' });
medicalRecordSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Animal = mongoose.model('Animal', animalSchema);
const Medical_Record = mongoose.model('Medical_Record', medicalRecordSchema);
const AnimalMedicalRecord = mongoose.model('Animal_Medical_Record', animalMedicalRecordSchema);

module.exports = { Animal, Medical_Record, AnimalMedicalRecord };
