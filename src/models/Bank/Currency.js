const { Schema, model } = require("mongoose");

const CurrencySchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  }
});

module.exports = model("Currency", CurrencySchema);
