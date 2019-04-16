// Models
import User from './models/User';
import PersonalInformation from './models/PersonalInformation';
import Invoice from './models/Invoice';
import Account from './models/Account';
import Warehouse from './models/Warehouse';
import Product from './models/Product';

const resolvers = {
  Query: {
    // User
    getUser: (root, { id }) => {
      return new Promise((resolve, object) => {
        User.findById(id, (error, user) => {
          if (error) rejects(error);
          else resolve(user);
        });
      });
    },
    getUsers: (root, { limit, offset }) => {
      return User.find({})
        .limit(limit)
        .skip(offset);
    },

    // PersonalInformation
    getPersonalInformation: (root, { id }) => {
      return new Promise((resolve, object) => {
        PersonalInformation.findById(id, (error, personalInformation) => {
          if (error) rejects(error);
          else resolve(personalInformation);
        });
      });
    },
    getPersonalInformations: (root, { limit, offset }) => {
      return PersonalInformation.find({})
        .limit(limit)
        .skip(offset);
    },

    // Invoice
    getInvoice: (root, { id }) => {
      return new Promise((resolve, object) => {
        Invoice.findById(id, (error, invoice) => {
          if (error) rejects(error);
          else resolve(invoice);
        });
      });
    },
    getInvoices: (root, { limit, offset }) => {
      return (
        Invoice.find({})
          .populate('user')
          .populate('person')
          .populate('products.product')
          // .populate({
          // path: 'products.product',
          // model: 'Product'
          // path: 'products',
          // model: 'InvoiceProduct',
          // populate: {
          //   path: 'product',
          //   model: 'Product'
          // }
          // })
          .limit(limit)
          .skip(offset)
      );
    },

    // Client
    getClient: async (root, { id }) => {
      const person = await PersonalInformation.findById(id);
      const type = 'SALE';
      const invoices = await Invoice.find({ person, type }).populate(
        'products.product'
      );

      return {
        person,
        invoices
      };
    },
    getClients: async (root, { limit, offset }) => {
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
    },

    // Account
    getAccount: (root, { id }) => {
      return new Promise((resolve, object) => {
        Account.findById(id, (error, account) => {
          if (error) rejects(error);
          else resolve(account);
        });
      });
    },
    getAccounts: (root, { limit, offset }) => {
      return Account.find({})
        .limit(limit)
        .skip(offset);
    },

    // Warehouse
    getWarehouse: (root, { id }) => {
      return new Promise((resolve, object) => {
        Warehouse.findById(id, (error, warehouse) => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    getWarehouses: (root, { limit, offset }) => {
      return Warehouse.find({})
        .limit(limit)
        .skip(offset);
    },

    // Product
    getProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Product.findById(id, (error, product) => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    getProducts: (root, { limit, offset }) => {
      return Product.find({})
        .populate('warehouse')
        .limit(limit)
        .skip(offset);
    }
  },
  Mutation: {
    // User
    newUser: (root, { input }) => {
      const user = new User({
        username: input.username,
        password: input.password
      });

      return new Promise((resolve, object) => {
        user.save(error => {
          if (error) rejects(error);
          else resolve(user);
        });
      });
    },
    updateUser: (root, { input }) => {
      return new Promise((resolve, object) => {
        User.findOneAndUpdate({ _id: input.id }, input, (error, user) => {
          if (error) rejects(error);
          else resolve(user);
        });
      });
    },
    deleteUser: (root, { id }) => {
      return new Promise((resolve, object) => {
        User.findOneAndDelete(id, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
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

    // Account
    newAccount: (root, { input }) => {
      const account = new Account({
        id: input.id,
        name: input.name,
        bank: input.bank,
        type: input.type,
        number: input.number
      });

      return new Promise((resolve, object) => {
        account.save(error => {
          if (error) rejects(error);
          else resolve(account);
        });
      });
    },
    updateAccount: (root, { input }) => {
      return new Promise((resolve, object) => {
        Account.findById({ _id: input.id }, input, (error, account) => {
          if (error) rejects(error);
          else resolve(account);
        });
      });
    },
    deleteAccount: (root, { id }) => {
      return new Promise((resolve, object) => {
        Account.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    },

    // Warehouse
    newWarehouse: (root, { input }) => {
      const warehouse = new Warehouse({
        name: input.name,
        description: input.description,
        active: input.active
      });

      return new Promise((resolve, object) => {
        warehouse.save(error => {
          if (error) rejects(error);
          else resolve(warehouse);
        });
      });
    },
    updateWarehouse: (root, { input }) => {
      return new Promise((resolve, object) => {
        Warehouse.findOneAndUpdate(
          { _id: input.id },
          input,
          (error, warehouse) => {
            if (error) rejects(error);
            else resolve(warehouse);
          }
        );
      });
    },
    deleteWarehouse: (root, { id }) => {
      return new Promise((resolve, object) => {
        Warehouse.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    },

    // Product
    newProduct: (root, { input }) => {
      const product = new Product({
        name: input.name,
        price: input.price,
        stock: input.stock,
        iva: input.iva,
        description: input.description,
        active: input.active,
        warehouse: input.warehouse
      });

      return new Promise((resolve, object) => {
        product.save(error => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    updateProduct: (root, { input }) => {
      return new Promise((resolve, object) => {
        Product.findOneAndUpdate({ _id: input.id }, input, (error, product) => {
          if (error) rejects(error);
          else resolve(product);
        });
      });
    },
    deleteProduct: (root, { id }) => {
      return new Promise((resolve, object) => {
        Product.findOneAndDelete({ _id: id }, error => {
          if (error) rejects(error);
          else resolve('Se elimino correctamente');
        });
      });
    }
  }
};

export default resolvers;
