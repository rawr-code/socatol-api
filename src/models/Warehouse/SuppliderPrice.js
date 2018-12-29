const { Schema, model } = require("mongoose");

const SuppliderPriceSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  presentation: {
    type: Schema.Types.ObjectId,
    ref: "Presentation",
    required: true
  },
  supplider: {
    type: Schema.Types.ObjectId,
    ref: "Supplider",
    required: true
  }
});

module.exports = model("SuppliderPrice", SuppliderPriceSchema);
