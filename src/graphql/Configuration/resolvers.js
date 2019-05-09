const { Configuration } = require('../../models');

module.exports = {
  Query: {
    getConfiguration: async () => {
      try {
        const config = await Configuration.findOne();
        return config;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    updateConfigurationProductIVA: async (root, { input }) => {
      let searchConfig = await Configuration.findOne();
      console.log(searchConfig);
      if (searchConfig) {
        searchConfig.iva.product = input.iva;
        await searchConfig.save();
      } else {
        const newConfig = new Configuration({
          iva: {
            product: input.iva
          },
          invoice: {
            sale: {
              number: 0
            },
            purchase: {
              number: 0
            }
          }
        });
        await newConfig.save();
        console.log(newConfig);
      }

      return 'Exito';
    },
    updateConfigurationSaleInvoiceNumber: async (root, { input }) => {
      let searchConfig = await Configuration.findOne();
      console.log(searchConfig);
      if (searchConfig) {
        searchConfig.invoice.sale.number = input.number;
        await searchConfig.save();
      } else {
        const newConfig = new Configuration({
          iva: {
            product: 0
          },
          invoice: {
            sale: {
              number: input.number
            },
            purchase: {
              number: 0
            }
          }
        });
        await newConfig.save();
        console.log(newConfig);
      }

      return 'Exito';
    },
    updateConfigurationPurchaseInvoiceNumber: async (root, { input }) => {
      let searchConfig = await Configuration.findOne();
      console.log(searchConfig);
      if (searchConfig) {
        searchConfig.invoice.purchase.number = input.number;
        await searchConfig.save();
      } else {
        const newConfig = new Configuration({
          iva: {
            product: 0
          },
          invoice: {
            sale: {
              number: 0
            },
            purchase: {
              number: input.number
            }
          }
        });
        await newConfig.save();
        console.log(newConfig);
      }

      return 'Exito';
    }
  }
};
