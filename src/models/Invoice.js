const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    number: {
      type: Number,
      unique: true,
      required: true
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: 'PersonalInformation',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['purchase', 'sale']
    },
    description: {
      type: String
    },
    dateEmit: {
      type: Date,
      required: true
    },
    paymentType: {
      type: String,
      required: true
    },
    paid: {
      type: Boolean,
      default: false,
      required: true
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        price: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model('Invoice', InvoiceSchema);
