const { Schema, model } = require("mongoose");

const SuppliderSchema = new Schema({
  personalInfo: {
    type: Schema.Types.ObjectId,
    ref: "PersonalInfo"
  },
  phone: {
    type: Number,
    required: true
  }
});

module.exports = model("Supplider", SuppliderSchema);
