const { Schema, model } = require("mongoose");

const InvoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
    // required: true
  },
  fees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movement"
    }
  ],
  details: Schema.Types.ObjectId, // ObjectId => (PurchaseInvoice or SalesInvoice)
  number: {
    type: Number,
    unique: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["purchase", "sale"]
  },
  description: {
    type: String,
    lowercase: true
  },
  dateEmit: {
    type: Date,
    required: true
  },
  paymentType: {
    type: String,
    required: true,
    lowercase: true
  },
  paid: {
    type: Boolean,
    default: false
  }
});

module.exports = model("Invoice", InvoiceSchema);
