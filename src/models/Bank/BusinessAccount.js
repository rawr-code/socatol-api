const { Schema, model } = require("mongoose");

const BusinessAccountSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  }
});

module.exports = model("BusinessAccount", BusinessAccountSchema);
