const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse"
  },
  presentations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Presentation"
    }
  ],
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    lowercase: true
  }
});

module.exports = model("Product", ProductSchema);
