const {
  Configuration,
  PersonalInformation,
  Invoice
} = require('../../db/models');

module.exports = {
  Query: {
    getInvoice: async (root, { id }) => {
      try {
        const invoice = await Invoice.findById(id).populate('person');

        return invoice;
      } catch (error) {
        console.log(error);
      }
    },
    getInvoices: async (root, { limit, offset, type }) => {
      try {
        let invoices;
        if (type) {
          invoices = await Invoice.find({ type })
            .populate('user')
            .populate('person', 'name')
            .limit(limit)
            .skip(offset);

          invoices = invoices.map(invoice => ({
            id: invoice.id,
            number: invoice.number,
            dateEmit: invoice.dateEmit,
            paymentType: invoice.paymentType,
            person: invoice.person.name
          }));
        } else {
          invoices = await Invoice.find({})
            .populate('user')
            .populate('person')
            .limit(limit)
            .skip(offset);
        }

        return invoices;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    newInvoice: async (root, { input, type }) => {
      try {
        let config = await Configuration.findOne();
        if (!config) {
          return {
            message: 'Debe configurar el sistema antes de usarlo',
            success: false,
            error: true
          };
        }

        let invoiceNumber;
        let person;
        let { products } = input;

        const { id: personId, ...personInfo } = input.person;

        if (personId) {
          person = await PersonalInformation.findById(personId);
          if (!person) {
            throw new Error('Persona no encontrada');
          }
        } else {
          person = new PersonalInformation(personInfo);
          await person.save();
        }

        products = products.map(async item => {
          if (item.product) {
            return item;
          } else {
            const product = new Product({
              name: item.name,
              price: item.price,
              stock: item.quantity,
              warehouse: '5cc9bba99fbcea1f207bc11e',
              iva: config.iva.product
            });

            await product.save();

            return {
              product,
              name: product.name,
              price: product.price,
              quantity: item.quantity
            };
          }
        });

        products = await Promise.all(products);

        if (type === 'PURCHASE') {
          invoiceNumber = config.invoice.purchase.number;
        } else if (type === 'SALE') {
          invoiceNumber = config.invoice.sale.number;
        }

        const invoice = new Invoice({
          number: invoiceNumber,
          type,
          dateEmit: new Date(),
          paymentType: input.paymentType,
          note: input.note,
          person,
          products
        });

        await invoice.save();

        if (type === 'SALE') {
          config.invoice.sale.number += 1;
          await config.save();
          person.invoices.sale.push(invoice);
          await person.save();
        } else if (type === 'PURCHASE') {
          config.invoice.purchase.number += 1;
          await config.save();
          person.invoices.purchase.push(invoice);
          await person.save();
        }

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          error: true,
          message: 'Error al guardar'
        };
      }
    }
  }
};
