const { Schema, model } = require("mongoose");

const PersonalInfoSchema = new Schema({
  dni: {
    type: Number,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true
  },
  gender: {
    type: String,
    required: true,
    lowercase: true
  },
  address: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    lowercase: true
  },
  email: String
});

module.exports = model("PersonalInfo", PersonalInfoSchema);
