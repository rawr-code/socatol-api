const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  personalInfo: {
    type: Schema.Types.ObjectId,
    ref: "PersonalInfo"
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice"
    }
  ],
  phone: {
    type: Number,
    required: true
  }
});

module.exports = model("Client", ClientSchema);
