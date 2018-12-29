const { Schema, model } = require("mongoose");

const WarehouseSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  code: {
    type: String,
    required: true,
    lowercase: true
  }
});

module.exports = model("Warehouse", WarehouseSchema);
