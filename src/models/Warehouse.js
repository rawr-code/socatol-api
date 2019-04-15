const { Schema, model } = require('mongoose');

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

module.exports = model('Warehouse', WarehouseSchema);
