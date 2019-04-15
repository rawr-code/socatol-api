// Models
const User = require('./models/User/User');
const PersonalInformation = require('./models/PersonalInformation');
const Invoice = require('./models/Invoice');
const Account = require('./models/Account');
const Warehouse = require('./models/Warehouse');
const Product = require('./models/Product');

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
      return Invoice.find({})
        .limit(limit)
        .skip(offset);
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
        .limit(limit)
        .skip(offset);
    }
  },
  Mutation: {
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

module.exports = resolvers;
