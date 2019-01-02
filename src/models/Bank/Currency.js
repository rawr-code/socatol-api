const { Schema, model } = require("mongoose");

const CurrencySchema = new Schema({
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
  simbol: {
    type: String,
    required: true
  },
  country: {
    type: String,
    lowercase: true,
    required: true
  },
  banks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bank"
    }
  ]
});

module.exports = model("Currency", CurrencySchema);
