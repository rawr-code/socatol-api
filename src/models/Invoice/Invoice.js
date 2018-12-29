const { Schema, model } = require("mongoose");

const InvoiceSchema = new Schema({
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  dateEmit: {
    type: Date,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  presentations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Presentation",
      required: true
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = model("Invoice", InvoiceSchema);
