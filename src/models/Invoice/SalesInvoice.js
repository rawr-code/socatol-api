const { Schema, model } = require("mongoose");

const SalesInvoiceSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    required: true
  }
});

module.exports = model("SalesInvoice", SalesInvoiceSchema);
