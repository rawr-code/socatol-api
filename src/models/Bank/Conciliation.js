const { Schema, model } = require("mongoose");

const ConciliationSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    lowercase: true,
    required: true
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },
  movement: {
    type: Schema.Types.ObjectId,
    ref: "Movement",
    required: true
  }
});

module.exports = model("Conciliation", ConciliationSchema);
