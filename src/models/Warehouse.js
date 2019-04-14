const { Schema, model } = require('mongoose');

const WarehouseSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    active: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = model('Warehouse', WarehouseSchema);
