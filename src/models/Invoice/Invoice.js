const { Schema, model } = require("mongoose");

const InvoiceSchema = new Schema({
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
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  dateEmit: {
    type: Date,
    required: true
  },
  products: [
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
      presentations: [
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
            required: true,
            default: 0
          }
        }
      ]
    }
  ],
  paymentType: {
    type: String,
    required: true,
    lowercase: true
  },
  paid: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
    // required: true
  },
  supplider: {
    type: Schema.Types.ObjectId,
    ref: "Supplider"
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  presentations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Presentation"
    }
  ],
  fees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movement"
    }
  ]
});

module.exports = model("Invoice", InvoiceSchema);
