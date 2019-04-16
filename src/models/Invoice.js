import { Schema, model } from 'mongoose';

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
      enum: ['CASH', 'TRANSFERENCE'],
      required: true
    },
    paid: {
      type: Boolean,
      default: false,
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

export default model('Invoice', InvoiceSchema);
