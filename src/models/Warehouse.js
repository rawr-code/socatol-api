import { Schema, model } from 'mongoose';

const WarehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model('Warehouse', WarehouseSchema);
