const mongoose = require("mongoose");

const PacientSchema = new mongoose.Schema(
  {
    medicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      pacientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pacient", PacientSchema);