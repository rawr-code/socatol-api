import { Schema, model } from 'mongoose';

const PersonalInformationSchema = new Schema(
  {
    dni: {
      type: Number,
      // unique: true,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: String
  },
  {
    timeStmaps: true
  }
);

export default model('PersonalInformation', PersonalInformationSchema);
