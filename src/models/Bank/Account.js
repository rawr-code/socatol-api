const { Schema, model } = require("mongoose");

const AccountSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  bank: {
    type: Schema.Types.ObjectId,
    ref: "Bank",
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "PersonalInfo"
  }
});

module.exports = model("Account", AccountSchema);
