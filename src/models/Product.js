import { Schema, model } from 'mongoose';

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
    quantity: {
      type: Number,
      required: true
    },
    description: String,
    active: Boolean,

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

export default model('Product', ProductSchema);
