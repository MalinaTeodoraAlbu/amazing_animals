import mongoose from 'mongoose';

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
  },
  date: {
    type: String,
    required: true,
    match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  },
  dateRepeat: {
    type: String,
    required: true,
    match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  }, repeatTimes: {
    type: String,

  }
});



  const Medical_Record = mongoose.model('Medical_Record', medicalRecordSchema);

  export default Medical_Record;
