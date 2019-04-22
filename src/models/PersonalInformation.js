import { Schema, model } from 'mongoose';

const PersonalInformationSchema = new Schema(
  {
    dni: {
      type: String,
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
    email: String,

    invoices: {
      sale: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Invoice'
        }
      ],
      purchase: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Invoice'
        }
      ]
    }
  },
  {
    timeStmaps: true
  }
);

export default model('PersonalInformation', PersonalInformationSchema);
