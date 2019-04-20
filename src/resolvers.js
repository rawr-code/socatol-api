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
        const personInfo = await PersonalInformation.findById(id);

        return personInfo;
      } catch (error) {
        console.log(error);
      }
    },
    getPersonalInformations: async (root, { limit, offset }) => {
      try {
        const personInfos = await PersonalInformation.find({})
          .limit(limit)
          .skip(offset);

        return personInfos;
      } catch (error) {
        console.log(error);
      }
    },

    // Invoice
    getInvoice: async (root, { id }) => {
      try {
        const invoice = await Invoice.findById(id);

        return invoice;
      } catch (error) {
        console.log(error);
      }
    },
    getInvoices: async (root, { limit, offset }) => {
      try {
        const invoices = await Invoice.find({})
          .populate('user')
          .populate('person')
          .populate('products.product')
          .limit(limit)
          .skip(offset);

        return invoices;
      } catch (error) {
        console.log(error);
      }
    },

    // Client
    getClient: async (root, { id }) => {
      try {
        const person = await PersonalInformation.findById(id);
        const type = 'SALE';
        const invoices = await Invoice.find({ person, type }).populate(
          'products.product'
        );

        return {
          person,
          invoices
        };
      } catch (error) {
        console.log(error);
      }
    },
    getClients: async (root, { limit, offset }) => {
      try {
        const persons = await PersonalInformation.find({})
          .limit(limit)
          .skip(offset);
        const clients = await persons.map(async person => {
          const salesInvoice = await Invoice.findOne({
            person: person._id,
            type: 'SALE'
          });

          if (salesInvoice) {
            return person;
          }
        });

        return clients;
      } catch (error) {
        console.log(erro);
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
        const warehouse = await Warehouse.findById(id);

        return warehouse;
      } catch (error) {
        console.log(error);
      }
    },
    getWarehouses: async (root, { limit, offset }) => {
      try {
        const warehouses = await Warehouse.find({})
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
    newInvoice: async (root, { input }) => {
      try {
        const { id, ...personInfo } = input.person;
        let person;
        let products;

        if (id) {
          person = await PersonalInformation.findById(id);
          console.log('persona encontrada');
          if (!person) {
            throw new Error('Persona no encontrada');
          }
        } else {
          person = new PersonalInformation(personInfo);
          console.log('persona nueva');
          await person.save();
        }
        // if (input.products && input.products.length > 0) {
        //   products = await input.products.map(item => {
        //     const product = new InvoiceProduct(item);
        //     product.save();
        //     return product;
        //   });
        // }

        const invoice = new Invoice({
          number: 0,
          type: input.type,
          dateEmit: new Date(),
          paymentType: input.paymentType,
          paid: input.paid,
          note: input.note,
          person,
          products: input.products
        });

        await invoice.save();

        return invoice;
      } catch (error) {
        console.log(error);
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
        const product = new Product({
          name: input.name,
          price: input.price,
          quantity: input.quantity,
          description: input.description,
          active: input.active,
          warehouse: input.warehouse
        });

        await product.save();

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
