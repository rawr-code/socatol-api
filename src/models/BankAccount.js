import { Schema, model } from 'mongoose';

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
      enum: ['CURRENT', 'SAVING'],
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

export default model('BankAccount', BankAccountSchema);
