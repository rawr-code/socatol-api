const { Schema, model } = require("mongoose");

const SalesInvoiceSchema = new Schema({
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  presentations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Presentation",
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = model("SalesInvoice", SalesInvoiceSchema);
