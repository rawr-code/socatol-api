// Models
import User from './models/User';
import PersonalInformation from './models/PersonalInformation';
import Invoice from './models/Invoice';
import BankAccount from './models/BankAccount';
import Warehouse from './models/Warehouse';
import Product from './models/Product';

const resolvers = {
  Query: {
    // User
    getUser: async (root, { id }) => {
      try {
        const user = await User.findById(id);

        return user;
      } catch (error) {
        console.log(error);
      }
    },
    getUsers: async (root, { limit, offset }) => {
      try {
        const users = await User.find({})
          .limit(limit)
          .skip(offset);
        return users;
      } catch (error) {
        console.log(error);
      }
    },

    // PersonalInformation
    getPersonalInformation: async (root, { id }) => {
      try {
        const personInfo = await PersonalInformation.findById(id)
          .populate('invoices.sale')
          .populate('invoices.purchase');

        return personInfo;
      } catch (error) {
        console.log(error);
      }
    },
    getPersonalInformations: async (root, { limit, offset, type }) => {
      try {
        const personInfos = await PersonalInformation.find({})
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
    },

    // Invoice
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
            .populate('person')
            .limit(limit)
            .skip(offset);
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

    // BankAccount
    getBankAccount: async (root, { id }) => {
      try {
        const bankAccount = await BankAccount.findById(id);

        return bankAccount;
      } catch (error) {
        console.log(error);
      }
    },
    getBankAccounts: async (root, { limit, offset }) => {
      try {
        const bankAccounts = await BankAccount.find({})
          .limit(limit)
          .skip(offset);

        return bankAccounts;
      } catch (error) {
        console.log(error);
      }
    },

    // Warehouse
    getWarehouse: async (root, { id }) => {
      try {
        const warehouse = await Warehouse.findById(id).populate('products');

        return warehouse;
      } catch (error) {
        console.log(error);
      }
    },
    getWarehouses: async (root, { limit, offset }) => {
      try {
        const warehouses = await Warehouse.find({})
          .populate('products')
          .limit(limit)
          .skip(offset);

        return warehouses;
      } catch (error) {
        console.log(error);
      }
    },

    // Product
    getProduct: async (root, { id }) => {
      try {
        const product = await Product.findById(id).populate('warehouse');

        return product;
      } catch (error) {
        console.log(error);
      }
    },
    getProducts: async (root, { limit, offset }) => {
      try {
        const products = await Product.find({})
          .populate('warehouse')
          .limit(limit)
          .skip(offset);

        return products;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    // User
    newUser: async (root, { input }) => {
      try {
        const user = new User({
          username: input.username,
          password: input.password
        });

        await user.save();

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (root, { input }) => {
      try {
        await User.findOneAndUpdate({ _id: input.id }, input);

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (root, { id }) => {
      try {
        await User.findOneAndDelete(id);

        return {
          success: true,
          error: false,
          message: 'Eliminado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },

    // Invoice
    newInvoice: async (root, { input, type }) => {
      try {
        let person;
        let products;

        const { id: personId, ...personInfo } = input.person;

        if (personId) {
          person = await PersonalInformation.findById(personId);
          console.log('persona encontrada');
          if (!person) {
            throw new Error('Persona no encontrada');
          }
        } else {
          person = new PersonalInformation(personInfo);
          console.log('persona nueva');
          await person.save();
        }

        if (input.products) {
          products = input.products.map(async item => {
            const { id, name, price } = await Product.findById(item.product);
            const result = {
              product: id,
              name,
              price,
              quantity: item.quantity
            };
            return result;
          });
          products = await Promise.all(products);
        }

        const invoice = new Invoice({
          number: 0,
          type,
          dateEmit: new Date(),
          paymentType: input.paymentType,
          note: input.note,
          person,
          products
        });

        await invoice.save();

        if (type === 'SALE') {
          person.invoices.sale.push(invoice);
          await person.save();
        } else if (type === 'PURCHASE') {
          person.invoices.purchase.push(invoice);
          await person.save();
        }

        // return invoice;
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
    },

    // BankAccount
    newBankAccount: async (root, { input }) => {
      try {
        const bankAccount = new BankAccount({
          id: input.id,
          name: input.name,
          bank: input.bank,
          type: input.type,
          number: input.number,
          active: input.active
        });

        await bankAccount.save();

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    updateBankAccount: async (root, { input }) => {
      try {
        await BankAccount.findOneAndUpdate({ _id: input.id }, input);

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteBankAccount: async (root, { id }) => {
      try {
        await BankAccount.findOneAndDelete({ _id: id });

        return {
          success: true,
          error: false,
          message: 'Eliminado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },

    // Warehouse
    newWarehouse: async (root, { input }) => {
      try {
        const warehouse = await new Warehouse({
          name: input.name,
          description: input.description,
          active: input.active
        });

        await warehouse.save();

        return {
          message: 'Guardado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    },
    updateWarehouse: async (root, { input }) => {
      try {
        await Warehouse.findOneAndUpdate({ _id: input.id }, input);

        return {
          message: 'Guardado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteWarehouse: async (root, { id }) => {
      try {
        await Warehouse.findOneAndDelete({ _id: id });

        return {
          message: 'Eliminado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    },

    // Product
    newProduct: async (root, { input }) => {
      try {
        let warehouse = await Warehouse.findById(input.warehouse);
        const product = new Product({
          name: input.name,
          price: input.price,
          stock: input.stock,
          description: input.description,
          active: input.active,
          warehouse
        });

        await product.save();

        warehouse.products.push(product);

        await warehouse.save();

        return {
          message: 'Guardado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct: async (root, { input }) => {
      try {
        await Product.findOneAndUpdate({ _id: input.id }, input);

        return {
          message: 'Guardado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (root, { id }) => {
      try {
        await Product.findOneAndDelete({ _id: id });

        return {
          message: 'Eliminado con exito',
          success: true,
          error: false
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default resolvers;
