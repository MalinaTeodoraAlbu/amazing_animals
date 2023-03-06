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
    }
  });


  const Medical_Record = mongoose.model('Medical_Record', medicalRecordSchema);

  export default Medical_Record;
