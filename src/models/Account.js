const { Schema, model } = require('mongoose');

const AccountSchema = new Schema(
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
      enum: ['current', 'saving'],
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

module.exports = model('Account', AccountSchema);
