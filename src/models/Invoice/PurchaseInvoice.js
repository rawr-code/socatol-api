const { Schema, model } = require("mongoose");

const PurchaseInvoiceSchema = new Schema({
  supplider: {
    type: Schema.Types.ObjectId,
    ref: "Supplider",
    required: true
  },
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    required: true
  }
});

module.exports = model("PurchaseInvoice", PurchaseInvoiceSchema);
