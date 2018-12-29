const { Schema, model } = require("mongoose");

const BankSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  code: {
    type: String,
    lowercase: true,
    required: true
  },
  currency: {
    type: Schema.Types.ObjectId,
    ref: "Currency",
    required: true
  }
});

module.exports = model("Bank", BankSchema);
