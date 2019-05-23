const { Schema, model } = require('mongoose');

const InvoiceSchema = new Schema(
  {
    number: {
      type: Number,
      required: true
    },
    numberRef: String,
    bankRef: String,

    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['COMPRA', 'VENTA'],
      required: true
    },
    dateEmit: {
      type: String,
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
      ref: 'Person',
      required: true
    },
    status: {
      type: String,
      enum: ['PENDIENTE', 'CONCILIADO'],
      default: 'PENDIENTE'
    },

    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
      }
    ],

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
