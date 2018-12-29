const { Schema, model } = require("mongoose");

const ClientSchema = new Schema({
  personalInfo: {
    type: Schema.Types.ObjectId,
    ref: "PersonalInfo"
  }
});

module.exports = model("Client", ClientSchema);
