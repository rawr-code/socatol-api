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
    stock: {
      type: Number,
      required: true
    },
    iva: {
      type: String,
      required: true
    },
    description: String,
    active: Boolean,

    warehouse: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Product', ProductSchema);
