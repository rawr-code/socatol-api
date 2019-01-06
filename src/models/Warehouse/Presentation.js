const { Schema, model } = require("mongoose");

const PresentationSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
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
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

module.exports = model("Presentation", PresentationSchema);
