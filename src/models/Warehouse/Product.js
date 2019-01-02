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
  },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: "Presentation"
  }
});

module.exports = model("Product", ProductSchema);
