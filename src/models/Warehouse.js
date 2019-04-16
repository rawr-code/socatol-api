import { Schema, model } from 'mongoose';

const WarehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    active: Boolean
  },
  {
    timestamps: true
  }
);

export default model('Warehouse', WarehouseSchema);
