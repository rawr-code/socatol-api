const { Schema, model } = require("mongoose");

const BusinessAccountSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true
  },
  movements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movement"
    }
  ],
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true
  }
});

module.exports = model("BusinessAccount", BusinessAccountSchema);
