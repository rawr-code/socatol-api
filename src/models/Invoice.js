const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema(
  {
    number: {
      type: Number,
      // unique: true,
      required: true
    },
    type: {
      type: String,
      enum: ['PURCHASE', 'SALE'],
      required: true
    },
    dateEmit: {
      type: Date,
      required: true
    },
    paymentType: {
      type: String,
      enum: ['EFECTIVO', 'TRANSFERENCIA'],
      required: true
    },
    note: String,

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    person: {
      type: Schema.Types.ObjectId,
      ref: 'PersonalInformation',
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
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
