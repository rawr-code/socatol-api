const { Schema, model } = require("mongoose");

const WarehouseSchema = new Schema({
  name: {
    type: String,

    lowercase: true
  },
  code: {
    type: String,
    unique: true,

    lowercase: true
  }
});

module.exports = model("Warehouse", WarehouseSchema);
