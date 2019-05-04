const { Schema, model } = require('mongoose');

const ConfigurationSchema = new Schema({
  iva: {
    product: {
      type: Number,
      required: true
    }
  },
  invoice: {
    sale: {
      number: {
        type: Number,
        required: true
      }
    },
    purchase: {
      number: {
        type: Number,
        required: true
      }
    }
  }
});

module.exports = model('Configuration', ConfigurationSchema);
