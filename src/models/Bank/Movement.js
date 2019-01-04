const { Schema, model } = require("mongoose");

const MovementSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  reference: {
    type: String,
    lowercase: true,
    required: true
  },
  description: {
    type: String,
    lowercase: true,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  conciliate: {
    type: Boolean,
    default: false
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "BusinessAccount",
    required: true
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice"
    }
  ]
});

module.exports = model("Movement", MovementSchema);
