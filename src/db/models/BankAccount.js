const { Schema, model } = require('mongoose');

const BankAccountSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    bank: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['CORRIENTE', 'AHORRO'],
      required: true
    },
    number: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('BankAccount', BankAccountSchema);
