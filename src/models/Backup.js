const { Schema, model } = require('mongoose');

const BackupSchema = new Schema(
  {
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Backup', BackupSchema);
