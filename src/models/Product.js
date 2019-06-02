const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    iva: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },

    suppliders: [
      {
        person: {
          type: Schema.Types.ObjectId,
          ref: 'Person'
        },
        prices: [
          {
            invoice: {
              type: Schema.Types.ObjectId,
              ref: 'Invoice',
              required: true
            },
            date: {
              type: String,
              required: true
            },
            amount: {
              type: Number,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
          }
        ]
      }
    ],

    clients: [
      {
        person: {
          type: Schema.Types.ObjectId,
          ref: 'Person'
        },
        quantitys: [
          {
            invoice: {
              type: Schema.Types.ObjectId,
              ref: 'Invoice',
              required: true
            },
            date: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
          }
        ]
      }
    ],

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', ProductSchema);
