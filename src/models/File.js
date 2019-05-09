const { Schema, model } = require('mongoose');

const FileSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  encoding: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

module.exports = model('File', FileSchema);
