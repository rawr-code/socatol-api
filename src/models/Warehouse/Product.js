const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse"
  }
});

module.exports = model("Product", ProductSchema);
