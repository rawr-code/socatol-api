const fs = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const xlsx = require('xlsx');

// Models
const Configuration = require('./models/Configuration');
const User = require('./models/User');
const PersonalInformation = require('./models/PersonalInformation');
const Invoice = require('./models/Invoice');
const BankAccount = require('./models/BankAccount');
const Warehouse = require('./models/Warehouse');
const Product = require('./models/Product');

const UPLOAD_DIR = './extractos-bancarios';

const storeFS = ({ stream, filename }) => {
  // Ensure upload directory exists.
  mkdirp.sync(UPLOAD_DIR);

  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  let stream = createReadStream();
  let buffers = [];
  stream.on('data', function(data) {
    buffers.push(data);
  });
  stream.on('end', function() {
    var buffer = Buffer.concat(buffers);
    var workbook = xlsx.read(buffer); // works
    console.log(workbook);
    let sheet_name_list = workbook.SheetNames;
    let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
  });

  // console.log(stream);
  // const { id, path } = await storeFS({ stream, filename });
  // console.log({ id, path });

  // const workbook = xlsx.readFile(stream);
  // let sheet_name_list = workbook.SheetNames;
  // let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  // // console.log(xlData);
  // console.log(Object.keys(xlData[0]));

  return upload;
  // return storeDB({ id, filename, mimetype, path });
};

const resolvers = {
  Query: {
    // Configuration
    getConfiguration: async () => {
      try {
        const config = await Configuration.findOne();
        return config;
      } catch (error) {
        console.log(error);
      }
    },
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
    // Configuration
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
    },

    // Upload Files
    singleUpload: async (root, { file }) => processUpload(file),

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
          description: input.description
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
          iva: input.iva,
          stock: input.stock,
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

module.exports = resolvers;
