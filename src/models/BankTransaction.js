const { Schema, model } = require('mongoose');

const TransactionSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true
  },
  concept: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    required: true
  },

  bankAccount: {
    type: Schema.Types.ObjectId,
    ref: 'BankAccount',
    required: true
  }
});

module.exports = model('Transaction', TransactionSchema);
