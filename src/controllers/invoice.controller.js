const moment = require('moment');
const {
  Configuration,
  Person,
  Invoice,
  Warehouse,
  Product
} = require('../models');

const { invoiceTypes } = require('../graphql/subscriptionsTypes');

module.exports = {
  invoice: async (root, { id }) => {
    try {
      const invoice = await Invoice.findById(id)
        .populate('person')
        .populate('transactions');

      return invoice;
    } catch (error) {
      console.log(error);
    }
  },
  invoices: async (root, { limit, offset, type }) => {
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
          amount: invoice.amount,
          dateEmit: invoice.dateEmit,
          status: invoice.status,
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
  },
  addInvoice: async (pubsub, { input, type }) => {
    try {
      let config = await Configuration.findOne();
      let warehouse = await Warehouse.findOne();
      if (!config) return 'Debe configurar el sistema antes de usarlo';
      let amount = 0;
      let invoiceNumber;
      let person;
      let { products } = input;

      const { id: personId, ...personInfo } = input.person;

      if (personId) {
        person = await Person.findById(personId);
        if (!person) {
          throw new Error('Persona no encontrada');
        }
      } else {
        person = new Person(personInfo);

        await person.save();
      }

      // Invoice

      let invoice;

      invoice = new Invoice({
        type,
        dateEmit: moment().format('DD-MM-YYYY'),
        paymentType: input.paymentType,
        note: input.note,
        person
      });

      // Products
      products = products.map(async item => {
        amount += Number(item.price) * Number(item.quantity);
        if (item.product) {
          let product = await Product.findById(item.product);
          if (type === 'VENTA') {
            console.log('venta');
            if (product.clients.length > 0) {
              console.log('if');

              const indexPerson = product.clients.findIndex(
                item => item.person.toString() === person._id.toString()
              );
              if (indexPerson >= 0) {
                console.log('find if');
                product.clients[indexPerson].quantitys.push({
                  invoice,
                  date: moment().format('DD-MM-YYYY'),
                  quantity: item.quantity
                });
              } else {
                console.log('find else');
                product.clients.push({
                  person,
                  quantitys: [
                    {
                      invoice,
                      date: moment().format('DD-MM-YYYY'),
                      quantity: item.quantity
                    }
                  ]
                });
              }
            } else {
              console.log('else');

              product.clients = [
                {
                  person,
                  quantitys: [
                    {
                      invoice,
                      date: moment().format('DD-MM-YYYY'),
                      quantity: item.quantity
                    }
                  ]
                }
              ];
            }
            product.stock -= item.quantity;
            await product.save();
          } else if (type === 'COMPRA') {
            console.log('compra');

            if (product.suppliders.length > 0) {
              console.log('if');

              const indexPerson = product.suppliders.findIndex(
                item => item.person.toString() === person._id.toString()
              );
              if (indexPerson >= 0) {
                console.log('find if');
                product.suppliders[indexPerson].prices.push({
                  invoice,
                  date: moment().format('DD-MM-YYYY'),
                  quantity: item.quantity,
                  amount: item.price
                });
              } else {
                console.log('find else');
                product.suppliders.push({
                  person,
                  prices: [
                    {
                      invoice,
                      date: moment().format('DD-MM-YYYY'),
                      quantity: item.quantity,
                      amount: item.price
                    }
                  ]
                });
              }
            } else {
              console.log('else');

              product.suppliders = [
                {
                  person,
                  prices: [
                    {
                      invoice,
                      date: moment().format('DD-MM-YYYY'),
                      quantity: item.quantity,
                      amount: item.price
                    }
                  ]
                }
              ];
            }

            product.stock += item.quantity;
            await product.save();
          }
          return item;
        } else {
          const product = new Product({
            name: item.name,
            price: item.price,
            stock: item.quantity,
            warehouse,
            iva: config.iva.product
          });

          await product.save();

          return {
            product,
            name: product.name,
            price: Number(product.price),
            quantity: Number(item.quantity)
          };
        }
      });

      products = await Promise.all(products);
      // console.log(products);

      // Invoice types
      invoice.products = products;
      invoice.amount = amount;

      if (type === 'VENTA') {
        invoice.number = config.invoice.sale.number;
      } else if (type === 'COMPRA') {
        invoice.number = config.invoice.purchase.number;
        invoice.numberRef = input.number;
        invoice.bankRef = input.ref;
      }

      console.log(invoice);

      await invoice.save();

      if (type === 'VENTA') {
        config.invoice.sale.number += 1;
        await config.save();
        person.invoices.sale.push(invoice);
        await person.save();
        pubsub.publish(invoiceTypes.ADD_SALE, {
          saleAdded: {
            id: invoice.id,
            number: invoice.number,
            dateEmit: invoice.dateEmit,
            paymentType: invoice.paymentType,
            person: invoice.person.name,
            amount: invoice.amount,
            status: invoice.status
          }
        });
      } else if (type === 'COMPRA') {
        config.invoice.purchase.number += 1;
        await config.save();
        person.invoices.purchase.push(invoice);
        await person.save();

        pubsub.publish(invoiceTypes.ADD_PURCHASE, {
          purchaseAdded: {
            id: invoice.id,
            number: invoice.number,
            dateEmit: invoice.dateEmit,
            paymentType: invoice.paymentType,
            person: invoice.person.name,
            amount: invoice.amount,
            status: invoice.status
          }
        });
      }

      return 'Guardado con exito';
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: true,
        message: 'Error al guardar'
      };
    }
  }
};
