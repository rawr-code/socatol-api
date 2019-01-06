const { Schema, model } = require("mongoose");

const PurchaseInvoiceSchema = new Schema({
  invoice: {
    type: Schema.Types.ObjectId,
    ref: "Invoice",
    required: true
  },
  supplider: {
    type: Schema.Types.ObjectId,
    ref: "Supplider",
    required: true
  },
  products: {
    required: true,
    type: [
      {
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
        presentations: {
          required: true,
          type: [
            {
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
            }
          ]
        }
      }
    ]
  }
});

module.exports = model("PurchaseInvoice", PurchaseInvoiceSchema);
