const { Person } = require('../models');

module.exports = {
  person: async (root, { id }) => {
    try {
      const personInfo = await Person.findById(id)
        .populate('invoices.sale')
        .populate('invoices.purchase');

      return personInfo;
    } catch (error) {
      console.log(error);
    }
  },
  persons: async (root, { limit, offset, type }) => {
    try {
      const personInfos = await Person.find({})
        .populate('invoices.sale')
        .populate('invoices.purchase')
        .limit(limit)
        .skip(offset);

      if (type) {
        if (type === 'CLIENT') {
          let clients = [];
          await personInfos.map(async person => {
            if (person.invoices.sale.length > 0) {
              clients.push(person);
            }
          });

          return clients;
        } else if (type === 'SUPPLIER') {
          let suppliders = [];
          await personInfos.forEach(async person => {
            if (person.invoices.purchase.length > 0) {
              suppliders.push(person);
            }
          });

          return suppliders;
        }
      }

      return personInfos;
    } catch (error) {
      console.log(error);
    }
  }
};
